# Contributing

**How to make changes**

When you want to make changes to the repository, do it like this in order to avoid conflicts with other contributors contributions:

1. Switch to development branch

This is the overall "in development" branch for all changes

`$ git checkout development`

2. Create new feature branch

This will give you your own branch to make changes on

`$ git branch my-feature-branch`

3. Switch to feature branch and start coding

`$ git checkout my-feature-branch`

4. Once done push changes to repo

```
$ git add .
$ git commit -m "my commit description comment"
... more commits
$ git push origin my-feature-branch
```

5. Once done with pushing all code to your branch in repo, open pull request to development branch on github, we can then review the code.
