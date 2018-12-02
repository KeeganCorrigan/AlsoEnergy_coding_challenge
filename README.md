### About

This is the technical challenge for AlsoEnergy. It includes three parts, detailed below.

### Technology Used

* JavaScript
* HTML/CSS
* Canvas

## Challenge 1. HTML and CSS

Using CSS grid, I implemented the following (screenshots!):

### Fullsize version

![image](https://s3-us-west-1.amazonaws.com/kc-ensemble/Screen+Shot+2018-11-30+at+10.46.30+AM.png)

### Under 600px width

![image](https://s3-us-west-1.amazonaws.com/kc-ensemble/Screen+Shot+2018-11-30+at+10.48.16+AM.png)

## Challenge 2. JavaScript Basics

In `main.js` you'll find the following code:

```
validateName = (employee) => {
  if (employee.nameOrder == "reverse") return {name: employee.last + " " + employee.first};
  return {name: employee.first + " " + employee.last};
}

sortGroupAlphabetically = (employeeGroups) => {
  return Object.keys(employeeGroups)
        .sort()
        .reduce(function(acc, key) {
          acc[key] = employeeGroups[key];
          return acc;
        }, {});
}

orderByGroup = (employees) => {
  const employeeGroups = {};
  employees.forEach(function(employee){
    const group = employee.group.toLowerCase();
    employeeGroups[group] === undefined ?
      employeeGroups[group] = [validateName(employee)] :
      employeeGroups[group].push(validateName(employee))
  });

  return sortGroupAlphabetically(employeeGroups);
}

```

which accepts the following format:

```
[
  {first: "Amanda", last: "Byron", group: "Sales"},
  {first: "Ye", last: "Xia", group: "Receiving", nameOrder: "reverse"},
  {first: "Miltiades", last: "Crescens", group: "Sales"},
];

```

and outputs the following format:

```
{
  receiving: [{name: "Xia Ye"}]
  sales: [{name: "Amanda Byron"}, {name: "Miltiades Crescens"}],       
}
```

I've also included some `console.log`s so it can be verified in action!

## Challenge 3. Rabbit Genealogy

For this challenge I changed the main portion of the `index.html` page to include a rabbit genealogy visualization. Using a canvas, three random rectangles are placed on page load (these rectangles represent rabbits). A new button has been added to the menu on the left hand side titled "new rabbit generation". When a user clicks on "new rabbit generation", the last generation of rabbits will have 0-5 rabbit babies which will be placed randomly (but designed to appear within a certain range of their parents). No rabbits overlap.

When a user clicks on a rabbit its children will be colored yellow, its parent will be colored blue, and it will generate a white border around itself (border width is based on width and height of rabbit).

Here's a screenshot:

![image](https://s3-us-west-1.amazonaws.com/kc-ensemble/Screen+Shot+2018-12-02+at+12.27.05+PM.png)

A couple of potential future improvements:

* Currently you can click on "new rabbit generation" to your heart's content. If your heart isn't content with 5 or 6 generations though, the web page is going to grind to a halt as rabbits overpopulate the canvas and can't find any open space. Close the page and revisit it!
* Clicking on a rabbit changes the color of its parent and children, but then if you select a child of that rabbit and click on it, it removes the parents border and changes its color. A way to blend colors might be a good addition. Or potentially all currently colored rabbits could reset after clicking on a rabbit.
* Sizing the canvas appropriately using grid is a bit of a struggle. I've yet to find an elegant implementation.
* The challenge didn't specify to use Node, but in future iterations the project would benefit from using it, if for nothing else - for code organization.
