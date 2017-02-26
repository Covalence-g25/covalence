# Covalence
Git is an amazing collaborative tool, but can be clumsy and confusing when it comes to pair programming or small changes.
Covalence is an Atom package that aims to bridge the gap (and reduce the amount of merge conflicts) by enabling you to simultaneously live-edit code with your teammates. Covalence also has built-in version control: simply press a hotkey at any breakpoint of your choosing, then view the entire history of your file in one place.
### To run locally:
- Fork and clone this repository.
- Using your command line, navigate into the Covalence folder, and type the following commands into the terminal. This will set a link for the package into the Atom Packages folder and install dependencies needed to run the package.
```sh
$ apm link
$ npm i
```
- Open the Atom file that you want to pair program in on each user's computer. In this version, it is important to note that you should only have one file open in your atom window while editing.
- Toggle on Covalence using the hot key control + option + O, and pair program away!
