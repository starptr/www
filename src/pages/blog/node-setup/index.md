---
title: "Node Setup for the Organized"
date: "2020-05-23T12:50:00"
description: "Worried about NodeJS version and npm package conflicts?"
---

Like [python](/blog/python-setup), NodeJS also suffers from specific version requirements. Unlike python, Node's popular package managers don't clutter the filesystem, so the tools to organize projects are a bit simpler. That's because the dependencies for an arbitrary project are installed to `node_modules`, local to the root of the project.

Here is my setup (indentation represents nesting):

```
nodenv (children below are shims:)
	node (global version is 14.3.0 as of writing)
	npm (childen below are global binaries:)
		yarn (children below are global binaries:)
			gatsby
	npx
	yarn
	yarnpkg
```

Since npm seems to have [controversial lockfile behavior](https://stackoverflow.com/questions/45022048/why-does-npm-install-rewrite-package-lock-json), I install global packages via `yarn`[^1].

## nvm > nodenv 😤😤

Maybe, but nvm is [really, really, slow](https://github.com/nvm-sh/nvm/issues/1277). Sure, there are [lazy-load implementations](https://github.com/ohmyzsh/ohmyzsh/issues/5327#issuecomment-248836398), but that doesn't work if you need to use node without a shell, e.g. VSCode's debugging feature.

## Hey! `yarn`'s global bins aren't shimmed!

True, but according to [this issues thread](https://github.com/nodenv/nodenv/issues/120), this shouldn't really be a problem since the shebang `#!/usr/bin/env node` selects the global Node version when installing global yarn packages anyways.

[^1]: It might not matter though because lockfiles are for building packages, i.e. not for the end user? I'm not a javascript guru, so don't quote me on this.😓
