# Lab 6: Deploying on Kubernetes

## What am I about to learn?

Today's lab session focuses on Kubernetes! We will build a Kubernetes cluster and deploy a containerized application.

!!! tip

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

Lorem ipsum dolor sit amet, (1) consectetur adipiscing elit.
{ .annotate }

1.  :man_raising_hand: I'm an annotation! I can contain `code`, __formatted
    text__, images, ... basically anything that can be expressed in Markdown.

The Bonus Lab focuses on how to:

* Deploy Kubernetes on the Google Kubernetes Engine (GKE) in GCP.
* Run the basic commands to interact with and push Docker images to Docker Hub.
* Deploy images from Docker Hub to Kubernetes.
* Horizontally scale images to support increased traffic using a load-balancing service.

You will need to watch the following video to follow the step-by-step commands.

> Take your time and make sure you double-check the commands before you run them.

* The following video demonstrates the commands used in this tutorial.  

[![Watch the video](https://i.ytimg.com/vi/LS0UvkbA9Pw/hqdefault.jpg)](https://youtu.be/LS0UvkbA9Pw)

> **You should run this tutorial on your GCP VM and the Google Cloud Shell :white_check_mark:**

* To run this tutorial, you will need a GCP VM; you must use the Docker VM that we created in Lab 5.

---

1. Go to Docker Hub and create a new account. We will use Docker Hub to push our images to deploy on Kubernetes.  
    * The link to Docker Hub: [Docker Hub](https://hub.docker.com/)

1. Create a new public repository.  
    * Add a name and a description; your Docker Hub username is in the top-right corner of your screen.

    ![dockerhub](images/dockerhub.png)

1. Go back to your Docker VM (from Lab 5) and log in to Docker Hub using your Docker user. If you deleted your VM, create a new one and install Docker.

    > In the VM, do not forget to switch to `docker-user`.  
    > The command is `su - docker-user`; this ensures that you log in and switch to the docker-user home directory.

1. Feel free to use the **mini-hi** repo or create your own.  
    - If you create your application, you will need to create a new repo, push your code, and clone it in the VM.  
    - In my case, I used the public repo `mini-hi.git`.  

    ```bash
    $ git clone --branch master https://github.com/steliosot/mini-hi.git
    ```

    > If you want, you can install Docker on your own computer.  
    > * Link: [Docker Desktop](https://docs.docker.com/get-docker/)  
    > The `mini-hi` app is a simple Node.js server with a Hello World message.  

    ```javascript
    const express = require('express')
    const app = express()

    app.get('/', (req, res) => {
        res.send('Hello World! Cloud@Birkbeck is fun!')
    })

    app.listen(3000)
    ```

1. Move into the project directory.

    ```bash
    $ cd mini-hi/
    ```

1. The Dockerfile is already there (I created it for you 😊). Examine it:

    ```dockerfile
    FROM alpine
    RUN apk add --update nodejs npm
    COPY . /src
    WORKDIR /src
    EXPOSE 3000
    ENTRYPOINT ["node", "./app.js"]
    ```

1. Build your image.  
    * Image name format: `<DockerHub-username>/<image-name>:<version>`  

    ```bash
    $ docker image build -t steliosot/mini-hi:1 .
    ```

1. Push your image to Docker Hub.

    ```bash
    $ docker push steliosot/mini-hi:1
    ```

    > Refresh your Docker Hub page; your image should now appear.

1. Search for your image.

    ```bash
    $ sudo docker search steliosot
    ```

    * 0 stars yet 😅 but it’s a start 😄

1. Create a Kubernetes cluster (GKE Standard) in Google Cloud.  
     * Give it a meaningful name, e.g. `my-gke-cluster`.  
     * By default, we deploy 3 nodes.  
     * This may take a few minutes—sit tight!

1. Activate the Cloud Shell, connect to your cluster, and copy the connect command:

    ```bash
    $ gcloud container clusters get-credentials stelios-cluster13 --zone us-central1-c --project lab-7-270015
    ```

    > The `gcloud` command is part of the Google Cloud CLI used to manage resources.

1. Run the following commands to check your connection.

    ```bash
    $ kubectl get nodes
    $ kubectl cluster-info
    ```

1. Run a container using the `mini-hi` image.

    ```bash
    $ kubectl run mini-hi-pod --image=steliosot/mini-hi:1
    ```

1. Check if the pod is running.

    ```bash
    $ kubectl get pods
    ```

    > Wait until you see `STATUS Running`; repeat the command if necessary.

1. Describe the pod for more details.

    ```bash
    $ kubectl describe pods
    ```

    > The displayed IP is internal to the cluster.

1. Create a deployment file named `mini-hi-deployment.yaml`.

    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: mini-hi-deployment
      labels:
        app: minihi
    spec:
      replicas: 3
      selector:
        matchLabels:
          app: minihi
      template:
        metadata:
          labels:
            app: minihi
        spec:
          containers:
          - name: minihi
            image: steliosot/mini-hi:1
            imagePullPolicy: Always
            ports:
            - containerPort: 3000
    ```

    > YAML is a human-readable format for configuration files.  
    > It stands for *YAML Ain’t Markup Language.*

1. Delete your previous pod.

    ```bash
    $ kubectl delete pods mini-hi-pod
    ```

1. Apply the deployment file.

    ```bash
    $ kubectl apply -f mini-hi-deployment.yaml
    ```

1. Get pods again.

    ```bash
    $ kubectl get pods
    ```

1. Scale the deployment. Edit the file and change `replicas: 3` → `replicas: 10`.

    ```bash
    $ kubectl apply -f mini-hi-deployment.yaml
    ```

1. View pod placement across nodes.

    ```bash
    $ kubectl get pods -o wide
    ```

1. Create a service file named `mini-hi-service.yaml`.

    ```yaml
    apiVersion: v1
    kind: Service
    metadata:
      name: mini-hi-service
      labels:
        app: mini-hi-service
    spec:
      type: LoadBalancer
      ports:
      - name: http
        port: 80
        protocol: TCP
        targetPort: 3000
      selector:
        app: minihi
      sessionAffinity: None
    ```

1. Apply the service.

    ```bash
    $ kubectl apply -f mini-hi-service.yaml
    ```

1. Check services to find your external IP.

    ```bash
    $ kubectl get services
    ```

    > Open that IP in your browser to view the running app.

1. Update your app (new Hello World message), rebuild and push as version 2.

    ```bash
    $ docker build -t steliosot/mini-hi:2 .
    $ docker push steliosot/mini-hi:2
    ```

1. Edit the deployment to use the new image and scale to 15 replicas.

    ```bash
    $ kubectl edit deployment mini-hi-deployment
    ```

    > Change:  
    > `replicas: 15`  
    > `image: steliosot/mini-hi:2`

1. Check pods again.

    ```bash
    $ kubectl get pods
    ```

    > You’ll see some pods terminating and new ones starting with the updated image.

1. Refresh your browser — your updated app is now live! 🎉

1. Remember to delete your cluster when finished to avoid extra costs.

    ```bash
    $ gcloud container clusters delete my-gke-cluster
    ```

---

✅ **Result:** MkDocs will automatically render proper numbering (1, 2, 3 …) without breaks, while keeping bullets, code blocks, and quotes exactly as expected.
