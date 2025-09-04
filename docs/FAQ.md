## FAQ

**(1) What exactly do I get after purchase?**
**\[Both]** A ZIP containing: Terraform for EC2/Lightsail, GitHub Actions workflows, sample app (Flask or static HTML), and docs (Quickstart, Troubleshooting, LICENSE, SUPPORT). Each ZIP includes a MANIFEST and checksum for integrity.

---
**(2) What’s the difference between the \$20 and \$50 tiers?**

* **[\$20 Tier](#link-to-20-tier-product-page)**
  Available in **HTML** and **Flask (Python)** flavours. Provides core CI/CD to AWS EC2 or Lightsail with a push-to-deploy workflow and Quickstart guide. Great for simple, personal, or small-team deployments.

* **[\$50 Tier](#link-to-50-tier-product-page)**
  Available in **HTML** and **Flask (Python)** flavours. Includes everything from the \$20 tier plus:

  * Multi-environment support (Dev auto-deploy + manual Staging/Prod).
  * Terraform IaC modules for reusable infra.
  * Bootstrap infra setup (VPC, S3 backend, DynamoDB lock).
  * Reference Flask app and EC2 setup/deploy scripts.
  * Extra workflows for deploy, destroy, and environment promotion.

  Ideal for teams who need **repeatable pipelines**, **multi-stage deployments**, or a **teaching reference** for CI/CD best practices.

---
**(3) Can I upgrade from \$20 to \$50 later?**

**\[Both]** Yes. Replace the \$20 workflows with the \$50 set and follow the \$50 Quickstart. Your infra state can stay; you mainly swap CI steps. (We recommend testing on a new branch first.)

---

**(4) Can I customize the workflows and Terraform?**

**Absolutely**. You’re licensed to modify for your own projects. Edit variables (region, instance type), add steps (linters/tests), swap AMIs, or extend the pipeline as needed.

👉 For full terms of use, see the [LICENSE.md](./LICENSE.md) file.

---
**(5) What are the prerequisites?**

Before running any of the CI/CD pipelines, you’ll need a few prerequisites such as an **AWS account**, an **IAM user with access keys**, an **EC2 key pair (PEM file)**, and some **GitHub Secrets**.  

👉 See our full [Prerequisites Setup Guide](./prerequisites.md) for step-by-step instructions and official AWS/GitHub documentation links.

#### ⚡ Important Note on Prerequisites vs. Your App

The items below are included **only for the sample demo apps** provided in this package:

* **\$50 tier:** AWS account with IAM credentials (user/role for Terraform + deploy).
* **GitHub Repository** with Actions enabled.
* **Terraform** (pinned version in MANIFEST).
* **Flask variant:** Python 3.10+ runtime (installed via setup scripts for the demo app).
* **HTML variant:** No runtime required — just static assets served by nginx.

👉 For **your own applications**, you’ll need to install and configure any additional dependencies yourself by editing `setup_ec2.sh` (or extending the Terraform modules). The packaged scripts are intentionally lightweight, so you can adapt them to your stack.

---
**(6) Is there one-to-one support?**
**\[Both]** No. This is **community support only**. If GitHub/AWS changes break a script, open a GitHub Issue with logs—we’ll patch. No custom setup or SLAs.

---
**(7) How do I verify the download is authentic?**
Each ZIP file includes a `checksums.txt` file containing a SHA-256 hash. Run the following command and compare the output with the value in `checksums.txt` (see License section 6 for your responsibility to verify integrity):

* **macOS/Linux:**

  ```bash
  shasum -a 256 <filename>.zip
  ```
* **Windows (PowerShell):**

  ```powershell
  Get-FileHash <filename>.zip -Algorithm SHA256
  ```

---
**(8) What’s covered by the license? Can I share this with my team?**
**\[Both]** You can use and modify internally for your org/projects. **No resale/redistribution** and **no public uploads**. See LICENSE.md for details.

---
**(9) Refunds?**
**\[Both]** 7 days if you can’t complete Quickstart and share relevant logs/errors. We’ll try to help first.

---
**(10) What are typical errors and quick fixes (per variant)?**
**\[Flask]**

* **App boots locally but 502 on EC2** → Check gunicorn start command/port; ensure security group allows the HTTP port the app binds to.
* **Pip install fails in CI** → Pin Python version + `pip cache` (or use \$50 Docker workflow).
* **Environment variables not applied** → Add them to GitHub Secrets and reference in deploy step.
  **\[HTML]**
* **Files deploy but 403/404** → Ensure Nginx/Apache root matches your build output path; check file permissions & index.html path.
* **Cache not updating** → Invalidate CDN/clear browser cache; bump asset query strings.

---
**(11) Costs & safety—how do I avoid surprise AWS bills?**
**\[Both]** Defaults target small instances (e.g., t3.micro). Set budgets/alerts, and use the **destroy** workflow (with manual confirm) when testing. Review security groups and IAM policies; keep least-privilege.

---
**(12) Docker support & speed-ups—what’s included?**
**\[\$50, Flask recommended]** The \$50 tier ships a Dockerized pipeline with layer caching (faster builds), optional mock-API test step, and clearer artifact separation. If you don’t need Docker, \$20 may be enough.

---

**(13) GitHub Actions is failing — what should I check?**
**\[Both]** First, open the **Actions tab** in your GitHub repo to review logs. Common causes are:

1. Secrets not set correctly (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, PEM key).
2. EC2 instance not running.
3. Security Group missing an inbound rule for **SSH (22)** from your IP.

---

**(14) I can’t connect to my EC2 instance — why?**
**\[Both]** Test SSH directly:

```bash
ssh -i ~/Downloads/my-cicd-key.pem ubuntu@YOUR_EC2_IP
```

If connection fails:

1. Confirm Security Group allows **SSH (22)** from your IP.
2. Check PEM file permissions: `chmod 400 my-cicd-key.pem`.
3. Ensure the EC2 instance is in the **running** state in AWS Console.

---

**(15) My website isn’t loading in the browser — what’s wrong?**
**\[\$20 HTML/Flask]** Likely an nginx or app process issue. Try:

```bash
ssh -i $KEY_PATH ubuntu@$EC2_IP "sudo systemctl status nginx"
ssh -i $KEY_PATH ubuntu@$EC2_IP "sudo systemctl restart nginx"
```

Also confirm your Security Group allows **HTTP (80)** traffic from `0.0.0.0/0`.

---

**(16) Why do I see “Permission Denied” errors when deploying?**
**\[Both]** This usually means the web directory doesn’t have the right ownership. Fix with:

```bash
ssh -i $KEY_PATH ubuntu@$EC2_IP "sudo chown -R ubuntu:ubuntu /var/www/html/hello-world-project"
```

---

**(17) Where should I look for detailed errors?**
**\[Both]**

* **GitHub Actions Logs** → See the Actions tab in your repo.
* **Server Logs** → SSH to your EC2 instance and run:

  ```bash
  sudo tail -f /var/log/nginx/error.log
  ```
* **AWS Console** → Check EC2 health checks and instance status.


