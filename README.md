# Reproduction Steps

* clone down the project, note that the versionis on 2.0.0-rc.29.git.20200211.80b87e12(from sources)
* `cd packages/project`
* `yarn start`
* view app at `localhost:8000` note the lack of errors around react-dnd context in developer console
* now cd to root of project
* `yarn set version berry`
* `yarn -v` should return `2.0.0-rc.30`
* `yarn`
* `yarn start`
* note errors in console around missing react-dnd context