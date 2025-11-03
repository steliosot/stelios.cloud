# Lab 1.1: Introduction to Linux

Welcome to your first hands-on lab in the module!  
This session is designed to give you a **solid start** with Linux fundamentals and basic Cloud VM interaction.

---

## 🎯 What You’ll Learn

Lab 1 Part 1 focuses on:

- **Part A:** Connecting to your Virtual Machine (VM) in Google Cloud Platform  
- **Part B:** Running Linux commands via the Command Line Interface (CLI)

!!! note
    Today’s lab session sets the foundation for your next 10 weeks of Cloud Computing work.  
    Please complete **all** the steps before the next class.

---

## 🧭 How to Approach This Lab

The labs are written as **step-by-step tutorials** — follow them carefully.

!!! tip "Before you begin"
    - Watch the **Week 0** videos on redeeming your coupon, creating a VM, and connecting with **Visual Studio Code**.  
    - Use these labs as an **interactive checklist** — type every command yourself.

!!! example "Learning by Doing"
    - Avoid **copy–paste**. Type commands manually to understand what each one does.  
    - Understanding the CLI (Command Line Interface) is one of the **core skills** of a computer scientist.  
    - Don’t worry if you forget — you’ll practice the same commands repeatedly.

!!! tip "Optional but highly recommended"
    Create a GitHub Page or online logbook to note important commands and screenshots.  
    This will serve as your **personal Linux cheat sheet**.

---

## 💡 Explore More

Want to explore more about the Linux CLI?

📘 Download the [Linux Pocket Guide (3rd Edition)](https://www.dropbox.com/s/roe59y2gyghyq7b/Linux%20Pocket%20Guide%2C%203rd%20Edition.pdf?dl=0)

!!! warning
    Avoid copying commands directly from PDFs — hidden characters (like smart quotes) can break terminal input.

---

## 🧩 Part A — Preparing Your Workspace

1. Follow **Week 0** instructions to redeem your coupon and create a new VM.
2. Start your VM using the same configuration.

!!! info
    You’ll use this VM throughout the lab series — treat it as your personal Cloud workstation.

---

## ⚙️ Part B — Deploying a Cloud Application

You’ll now learn basic Linux commands on your VM (Ubuntu 18.04) and deploy your first **Apache web server**.

---

### 🏁 Step 1 – Check Your Current Directory

```bash
pwd
```

Expected output:

```text
/home/username
```

!!! note
    `pwd` stands for **print working directory** — it shows where you are in the file system.

---

### 👤 Step 2 – Create a New User

```bash
sudo adduser yoda
```

Follow the prompts to create a password and enter user details.

!!! warning
    You won’t see your password as you type — this is normal in Linux.

---

### ⚡ Step 3 – Make `yoda` a Superuser

```bash
sudo usermod -aG sudo yoda
```

This gives `yoda` admin privileges.

---

### 🔁 Step 4 – Switch User

```bash
sudo su yoda
```

> You’re now logged in as **yoda** but still located in your previous home directory.  
> Move to your new one:

```bash
cd /home/yoda
```

---

### 🧹 Step 5 – Clear the Terminal

```bash
clear
```

---

### 📂 Step 6 – List Files

```bash
ls
```

The folder is empty. Let’s create something.

---

### 🧱 Step 7 – Create a Folder and Navigate to It

```bash
mkdir jedi
cd jedi
pwd
```

Expected output:

```text
/home/yoda/jedi
```

---

### ✏️ Step 8 – Install a Text Editor

```bash
sudo apt update
sudo apt install nano
```

!!! note
    `nano` includes `pico`, a lightweight text editor we’ll use here.

---

### 🧾 Step 9 – Create and Edit a File

```bash
pico jedi/luke.txt
```

Paste or type:

```
Luke Skywalker was a Tatooine farmboy who rose from humble beginnings to become one of the greatest Jedi the galaxy has ever known.
```

**Save:** CTRL + S  
**Exit:** CTRL + X

---

### 📑 Step 10 – Create Another File

```bash
pico jedi/obi-wan.txt
```

Type:

```
A legendary Jedi Master, Obi-Wan Kenobi was a nobleman and gifted in the ways of the Force.
```

---

### 🔍 Step 11 – View File List

```bash
ls -l jedi
```

Expected output:

```text
total 8
-rw-rw-r-- 1 yoda yoda 131 Jan 9 11:25 luke.txt
-rw-rw-r-- 1 yoda yoda  92 Jan 9 11:30 obi-wan.txt
```

!!! tip
    Each line shows file permissions, owner, and size.  
    Both files belong to `yoda`.

---

### 📋 Step 12 – Copy and Remove Files

```bash
cp jedi/luke.txt jedi/luke_copy.txt
cp jedi/obi-wan.txt jedi/obi-wan-copy.txt
rm jedi/obi-wan-copy.txt
```

> Use `ls jedi` to confirm changes.

---

### 🧰 Step 13 – Common Commands Recap

| Command | Purpose |
|----------|----------|
| `pwd` | Show directory path |
| `ls` | List files/folders |
| `cd testfolder` | Navigate into a folder |
| `cd ..` | Move up one level |
| `mkdir` | Create new folder |
| `pico filename` | Edit text file |
| `cp a.txt b.txt` | Copy file |
| `rm a.txt` | Delete file |

---

### 🗂️ Step 14 – Copy a Folder

```bash
cp -r jedi jedi_backup
```

Check:

```bash
ls
```

Output:

```text
jedi  jedi_backup
```

Then remove it:

```bash
rm -rf jedi_backup
```

---

### 🧩 Step 15 – Edit a File and View Its Contents

```bash
pico jedi/luke_copy.txt
```

Add at the top:

```
THIS IS A COPY
```

Now view it without opening the editor:

```bash
cat jedi/luke_copy.txt
```

---

### ⚒️ Step 16 – Install Apache Web Server

```bash
sudo apt install apache2
```

!!! info
    You’ll be prompted for your password and to confirm with **Y**.

Once installed, open your VM’s **External IP** in your browser →  
you should see the **Apache2 Default Page**.

![apache-screenshot](images/apache-screenshot.png){ loading=lazy }

> The default page is stored at `/var/www/html/index.html`.

---

### 🌐 Step 17 – Create Your First Web Page

```bash
pico yoda-site.html
```

Paste:

```html
<html>
  <head><title>This is a Yoda site!</title></head>
  <body>
    Hello World! I am Yoda! 🧙‍♂️
    <p>
      <img src="https://cdn.quotesgram.com/img/71/36/1837595163-Yoda-The-Empire-Strikes-Back.jpg">
    </p>
  </body>
</html>
```

Save (**CTRL S**) → Exit (**CTRL X**)

---

### 📦 Step 18 – Deploy Your Web Page

Copy the file to the Apache web directory:

```bash
sudo cp yoda-site.html /var/www/html/
```

Now visit your VM’s URL:

```
http://<external-ip>/yoda-site.html
```

> 🎉 Your Yoda site is live!

---

## 🏁 Summary

| Command | Purpose |
|----------|----------|
| `cp -r folderA folderB` | Copy entire folders |
| `rm -rf folder` | Delete a folder forcefully |
| `cat file.txt` | View file contents |
| `sudo apt install package` | Install software |
| `sudo cp file /var/www/html/` | Deploy web content |

---

!!! success "You Did It!"
    You’ve successfully completed **Lab 1 Part 1**.  
    You’ve learned how to:
    - Work with files and folders in Linux  
    - Create and edit text files  
    - Install software using the CLI  
    - Deploy a basic web page on Apache  

    Now continue to **Lab 1 Part 2** 🚀
