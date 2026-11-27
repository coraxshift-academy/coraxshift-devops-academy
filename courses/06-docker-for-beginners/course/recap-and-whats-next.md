# Recap and What's Next

**Docker for Beginners · Coraxshift DevOps Academy** · ⏱️ 10 minutes

## 🎉 Well done

You can now package a program, run it as a container, keep its data safe, run two services together, make the image safer and clean up without breaking anything. These are the habits used on real servers.

```text
Dockerfile ─▶ build ─▶ image ─▶ run ─▶ container ─▶ volume keeps the data ─▶ Compose joins services
```

> 📖 **From my café:** The best systems are the ones that behave the same way every time, whichever seat you sit at. That is the confidence a good package gives you.

## 🧭 Your cheat sheet

| I want to... | Use |
|---|---|
| Check Docker | `docker version` |
| Run a container | `docker run -d --name NAME -p HOST:CONTAINER IMAGE` |
| See running containers | `docker ps` |
| See all containers | `docker ps -a` |
| Read logs | `docker logs NAME` |
| Run a command inside | `docker exec NAME COMMAND` |
| Stop / remove | `docker stop NAME` / `docker rm NAME` |
| Build an image | `docker build -t NAME:TAG .` |
| List images | `docker image ls` |
| Make a volume | `docker volume create NAME` |
| Check a Compose file | `docker compose config --quiet` |
| Start everything | `docker compose up -d --build` |
| See services | `docker compose ps` |
| Read service logs | `docker compose logs SERVICE` |
| Stop, keep data | `docker compose down` |
| Stop, delete data too | `docker compose down -v` |
| See what uses space | `docker system df` |

## 🛡️ Your four golden rules

1. **Run as a normal user**, not root.
2. **Keep secrets out of images and out of Git.**
3. **Use specific tags**, not `latest`.
4. **Clean up by name**, and read before you prune.

## ➡️ What comes next

You ran two containers on one machine. The next step is **Kubernetes**, which manages many containers across many machines, restarts them when they fail, and scales them up and down.

Ask your instructor about the next course.

## Thank you

Our mission at Coraxshift DevOps Academy is to make tech education **accessible, practical and enjoyable**. You just took another real step towards being a confident engineer.

**Learn. Build. Deploy. Grow.** 👋

---

<table width="100%"><tr><td align="left">[⬅️ Quiz](quiz.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[🏠 Course home](../README.md)</td></tr></table>
