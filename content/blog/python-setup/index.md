---
title: "Python Setup for the Organized"
date: "2020-05-22T13:48:00"
description: "Worried about python version and package conflicts?"
tags: ["Computer Science"]
---

Some packages depend on a specific version of python, which is why you'll need a python version manager like `pyenv`. Some projects will conflict on specific versions of packages needed, so you'll need a way to sandbox projects like `pipenv`. Here is my setup (indentation represents nesting):

```
python
pip
pyenv
	python(3.6.9)
	pip
		pipx
			pipenv
```

The top level `python` and `pip` are from the system, either installed by default or via the default package manager. `pyenv` lets us install other versions of `python` (and the corresponding `pip`). Since `pip uninstall` doesn't cleanly uninstall packages[^1], I installed `pipx` globally first, and then globally install the project manager `pipenv` under that. Initialize packages with `pipenv install <package>` in a project folder, and you're good to go.

[^1]: This might not be actually true, see [this SO answer](https://stackoverflow.com/a/35524522).
