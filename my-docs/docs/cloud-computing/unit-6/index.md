# Unit 6 — Orchestration with Kubernetes

## 🎯 Overview

This unit introduces **cloud orchestration** and demonstrates how platforms like **Kubernetes** automate the deployment, scaling, and management of containerised applications.

Students explore how orchestration differs from automation, understand how modern distributed systems are built using **containers**, and learn how Kubernetes provides scalability, reliability, and self-healing across cloud environments.

The lecture explains the shift from traditional monolithic applications to **cloud-native architectures**, where resources are dynamically managed through declarative configuration files and orchestration layers.

---

## 📘 Key Topics

- Automation vs. orchestration  
- The role of containers in cloud computing  
- The evolution from Docker to Kubernetes  
- Kubernetes architecture and components:
  - Pods, Nodes, ReplicaSets, Deployments  
  - Kubelet, Scheduler, Controller Manager, API Server  
- Declarative configuration with YAML manifests  
- Services and Load Balancing  
- Cluster creation and management using **Google Kubernetes Engine (GKE)**  
- Rolling updates and scaling strategies  

---

## 🧩 Learning Outcomes

By the end of this unit, students will be able to:

1. Explain the purpose and benefits of orchestration in cloud environments.  
2. Describe the architecture and key components of Kubernetes.  
3. Deploy and manage containerised applications on a Kubernetes cluster.  
4. Use declarative YAML configuration files to define deployments and services.  
5. Implement horizontal scaling and load balancing for distributed applications.  
6. Apply update strategies (e.g., rolling updates) to manage application versions safely.  
7. Demonstrate good practices in managing cloud resources and cost efficiency.  

---

## 🧪 Lab 6 — Deploying on Kubernetes

In this lab, students:

1. Build and push a simple Node.js application image to **Docker Hub**.  
2. Create and connect to a **Kubernetes cluster** using **Google Kubernetes Engine (GKE)**.  
3. Deploy their image as a **Kubernetes Deployment** with multiple replicas.  
4. Expose the deployment through a **LoadBalancer Service** to obtain a public IP.  
5. Scale the deployment horizontally to handle increased traffic.  
6. Perform a **rolling update** by deploying a new image version (`mini-hi:2`).  
7. Validate the update and clean up resources by deleting the cluster.  

Through this lab, students gain practical experience with **container orchestration, scalability, and cloud deployment pipelines**, reflecting modern DevOps workflows.

---

