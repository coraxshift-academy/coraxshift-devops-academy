# Class 2: Idempotency and Handlers

**Time:** 2 hours
**Run commands in:** your Ansible lab folder.

## Idempotency means "make it so"

A playbook should describe the desired result. If the machine already matches, a second run should make no changes. For example, `apt` with `state: present` installs Nginx if missing and leaves it alone if present.

## Use a template for changing content

Create `templates/index.html.j2`:

```html
<!doctype html>
<html lang="en">
  <meta charset="utf-8">
  <title>CoraxReads</title>
  <h1>CoraxReads</h1>
  <p>Environment: {{ environment_name }}</p>
</html>
```

Add a variable such as `environment_name: lab` under `vars:` in the play. Replace the `copy` task with:

```yaml
    - name: Render the practice page
      ansible.builtin.template:
        src: templates/index.html.j2
        dest: /var/www/html/index.html
        owner: root
        group: root
        mode: "0644"
```

The template module fills placeholders with variables and writes the result. File mode 0644 allows the web server to read the page without giving it write access.

## Handler

Handlers run only when notified by a changed task. Add `notify: Validate and reload Nginx` to a changed Nginx configuration task, then define:

```yaml
  handlers:
    - name: Validate and reload Nginx
      ansible.builtin.service:
        name: nginx
        state: reloaded
```

Do not reload a service merely because the playbook ran; tie the handler to a relevant change. Test the service behavior in your lab first.
