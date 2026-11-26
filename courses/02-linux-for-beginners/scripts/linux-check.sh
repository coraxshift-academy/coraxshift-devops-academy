#!/usr/bin/env bash
# Linux for Beginners: self-check. Runs safe, non-interactive versions of the Class 1-3 skills
# inside a scratch folder (/tmp/linux-check). It never touches your own files, never needs sudo,
# and cleans up after itself. Run it in your Codespace:  bash scripts/linux-check.sh
set -u
W=/tmp/linux-check; rm -rf "$W"; mkdir -p "$W"; cd "$W" || exit 2
pass=0; fail=0
t() { # t "label" command...
  label="$1"; shift
  if out="$(timeout 30 "$@" 2>&1 </dev/null)"; then echo "PASS  $label"; pass=$((pass+1))
  else echo "FAIL  $label"; echo "      $out" | head -2; fail=$((fail+1)); fi
}
has() { [ -n "$(cat)" ]; }

echo "== Class 1: where am I? =="
t "whoami prints a name"      bash -c 'whoami | grep -q .'
t "pwd prints a folder"       bash -c 'pwd | grep -q "^/"'
t "uname shows Linux"         bash -c 'uname -s | grep -qx Linux'
t "free shows memory"         bash -c 'free -h | grep -q Mem'
t "df shows disk"             bash -c 'df -h / | grep -q "/"'
t "uptime works"              uptime
t "make, copy, move, delete files" bash -c 'mkdir -p a/b && echo hi > a/hello.txt && cp a/hello.txt a/b/ && mv a/b/hello.txt a/b/moved.txt && rm a/hello.txt && [ -f a/b/moved.txt ] && [ ! -f a/hello.txt ]'

echo "== Class 2: permissions and archives =="
t "chmod 644 shows rw-r--r--" bash -c 'echo x > f.txt && chmod 644 f.txt && ls -l f.txt | grep -q "^-rw-r--r--"'
t "chmod 600 shows rw-------" bash -c 'chmod 600 f.txt && ls -l f.txt | grep -q "^-rw-------"'
t "chmod +x makes it runnable" bash -c 'printf "#!/bin/bash\necho ran\n" > run.sh && chmod +x run.sh && ./run.sh | grep -q ran'
t "id shows your groups"      bash -c 'id | grep -q groups'
t "tar creates and lists"     bash -c 'tar -czf n.tar.gz f.txt && tar -tzf n.tar.gz | grep -q f.txt'
t "tar extracts elsewhere"    bash -c 'mkdir out && tar -xzf n.tar.gz -C out && [ -f out/f.txt ]'
t "grep finds a word"         bash -c 'printf "apple\nbanana\n" > fruit.txt && grep -q banana fruit.txt'
t "sudo is available (info only)" bash -c 'command -v sudo >/dev/null'

echo "== Class 3: processes, network, script =="
t "ps lists processes"        bash -c 'ps aux | grep -q "ps aux"'
t "start and kill a process"  bash -c 'sleep 300 & p=$!; kill -0 $p && kill $p; wait $p 2>/dev/null; ! kill -0 $p 2>/dev/null'
t "ss lists listeners"        bash -c 'command -v ss >/dev/null && ss -tuln | head -1 | grep -q .'
t "serve a page on 8099 and fetch it" bash -c 'mkdir -p site && echo "<h1>hello</h1>" > site/index.html; python3 -m http.server 8099 --directory site </dev/null >/dev/null 2>&1 & p=$!; sleep 1.5; curl -s --max-time 5 localhost:8099 | grep -q hello; rc=$?; kill $p 2>/dev/null; exit $rc'
t "a script with if/for runs" bash -c 'cat > h.sh <<"S"
#!/bin/bash
for d in /tmp /; do if [ -d "$d" ]; then echo "ok $d"; fi; done
S
chmod +x h.sh && [ "$(./h.sh | wc -l)" -eq 2 ]'
t "curl is installed"         bash -c 'command -v curl >/dev/null'

echo "== Tools used later in the course (info only) =="
for c in nginx nano git node npm; do
  if command -v $c >/dev/null 2>&1; then echo "HAVE  $c"; else echo "MISSING $c (the class shows how to install it if needed)"; fi
done

cd /tmp; rm -rf "$W"
echo; echo "RESULT: $pass passed, $fail failed"
[ "$fail" -eq 0 ]
