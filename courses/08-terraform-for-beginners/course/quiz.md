# Quiz: Terraform for Beginners

**Coraxshift DevOps Academy · Learn. Build. Deploy. Grow.**

🏅 **12 questions, about 20 minutes.** 8 are *Choose ONE*, 4 are *Choose ALL that apply*.
Score **90% (11 out of 12) or more** to earn your **Terraform for Beginners badge**. Below that, you get one retake after reviewing Classes 2 and 3.

Every question comes from something you practised in this course. Answer all of them **before** you look at the answers.

## Questions

**Q1. Choose ONE.** What is Infrastructure as Code?
- A. Drawing your network on paper
- B. Describing the setup you want in files that a tool can build from
- C. Writing a program that has no bugs
- D. Clicking through a website to set things up

**Q2. Choose ONE.** What is a provider in Terraform?
- A. The company that pays for your project
- B. A plugin that knows how to talk to one kind of thing, such as a cloud or local files
- C. A kind of variable
- D. The file that stores state

**Q3. Choose ONE.** What does `terraform init` do?
- A. Builds your resources
- B. Deletes your resources
- C. Downloads the providers your configuration needs
- D. Formats your files

**Q4. Choose ONE.** What does `terraform plan` do?
- A. Builds everything immediately
- B. Shows what Terraform would change, without changing anything
- C. Deletes the state
- D. Installs Terraform

**Q5. Choose ONE.** In a plan, what does `-/+` mean?
- A. The resource will be created
- B. The resource will be left alone
- C. The resource will be destroyed and then created again
- D. The resource has an error

**Q6. Choose ONE.** You run `terraform plan` straight after a successful apply and change nothing. What should it say?
- A. It plans to create everything again
- B. No changes. Your infrastructure matches the configuration.
- C. An error
- D. It asks you for a password

**Q7. Choose ONE.** Why must `terraform.tfstate` never go into Git?
- A. It is too large
- B. Terraform cannot read it from Git
- C. It can hold secrets in plain text and describes your whole setup
- D. Git cannot store files that end in `.tfstate`

**Q8. Choose ONE.** What is drift?
- A. When Terraform runs slowly
- B. When the real world no longer matches your code, often because of a manual change
- C. A type of variable
- D. A failed download

**Q9. Choose ALL that apply.** Which are good habits before `terraform apply`?
- A. Read the plan, especially the summary line
- B. Save the plan with `-out` and apply that exact file
- C. Use `-auto-approve` every time to save time
- D. Check that nothing unexpected is being destroyed

**Q10. Choose ALL that apply.** Which files should stay **out** of Git?
- A. `terraform.tfstate`
- B. Saved plan files such as `notice.tfplan`
- C. The `.terraform` folder
- D. Your `main.tf` configuration

**Q11. Choose ALL that apply.** Why preview with `terraform plan -destroy` before `terraform destroy`?
- A. To confirm it names only what you expect
- B. To avoid deleting the wrong project by mistake
- C. Because destroy does not work without it
- D. In the cloud, a forgotten lab costs money, so clean-up must be correct

**Q12. Choose ALL that apply.** A teammate changed a file by hand and your plan now shows a change. What is a sensible response?
- A. Talk to them to find out which version is right
- B. If the code is right, apply to repair the drift
- C. If the hand edit is right, change the code to match it
- D. Edit the state file by hand to hide the difference

---

## Your answers

Write your answers (for example `Q1: A`) and send them to your instructor. You will get your score and the full explanations back, so you can review each one.

---

<table width="100%"><tr><td align="left">[⬅️ Role play](role-play-explain-iac.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Recap ➡️](recap-and-whats-next.md)</td></tr></table>
