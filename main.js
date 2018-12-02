/*****************************************************************************************
* Part 2
****************************************************************************************/
var employees = [
        {first: "Amanda", last: "Byron", group: "Sales"},
        {first: "Ye", last: "Xia", group: "Receiving", nameOrder: "reverse"},
        {first: "Miltiades", last: "Crescens", group: "Sales"},
    ];

var employees2 = [
        {first: "Amanda", last: "Byron", group: "PuppySitting", nameOrder: "reverse"},
        {first: "Ye", last: "Xia", group: "Receiving", nameOrder: "reverse"},
        {first: "Miltiades", last: "Crescens", group: "Sales"},
        {first: "Byron", last: "Amanda", group: "PuppySitting"},
    ];

// Part 2 Answer Here

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

console.log(orderByGroup(employees));
console.log(orderByGroup(employees2));

/*****************************************************************************************
* Bonus
****************************************************************************************/

const canvas = document.querySelector('canvas');
const context = canvas.getContext("2d");

const rabbits = [];
let rabbitWidth = 50;
let rabbitHeight = 50;
let lastGen = [];
let currentGeneration = [];

colorParent = (parent) => {
  context.beginPath();
  context.fillStyle='blue';
  context.fillRect(parent.x, parent.y, parent.h, parent.w);
  context.fill();
}

colorChildren = (children) => {
  children.forEach(function (rabbit) {
    context.beginPath();
    context.fillStyle='yellow';
    context.fillRect(rabbit.x, rabbit.y, rabbit.h, rabbit.w);
    context.fill();
  });
};

addBorderSelf = (rabbit) => {
  context.moveTo(rabbit.x, rabbit.y);
  context.lineTo(rabbit.x + rabbit.w, rabbit.y);
  context.lineTo(rabbit.x + rabbit.w, rabbit.y + rabbit.h);
  context.lineTo((rabbit.x + rabbit.w) - rabbit.w, rabbit.y + rabbit.h);
  context.lineTo((rabbit.x + rabbit.w) - rabbit.w, (rabbit.y + rabbit.h) - rabbit.h);
  context.strokeStyle = "white";
  context.lineWidth = rabbit.h / 10;
  context.stroke();
}

findRelatives = (id, parentId) => {
  const children = rabbits.filter(rabbit => rabbit.pId == id)
  const parent = rabbits.filter(rabbit => rabbit.id == parentId)
  if (parent.length > 0) colorParent(parent[0])
  if (children.length > 0) colorChildren(children)
}

clickOnRabbit = (x, y) => {
    let isRabbit = false;
    for (let i = 0, len = rabbits.length; i < len; i++) {
        let left = rabbits[i].x, right = rabbits[i].x + rabbits[i].w;
        let top = rabbits[i].y, bottom = rabbits[i].y + rabbits[i].h;
        if (right >= x
            && left <= x
            && bottom >= y
            && top <= y) {
            isRabbit = rabbits[i];
        }
    }
    return isRabbit;
}

canvas.addEventListener('click', function(e) {
  let rabbit = clickOnRabbit(e.offsetX, e.offsetY);
  if (rabbit) {
    findRelatives(rabbit.id, rabbit.pId);
    addBorderSelf(rabbit);
  };
}, false);

determineNumberOfChildren = () => {
  const possibleDescendants = [0, 1, 2, 3, 4, 5];
  const numberOfChildren = possibleDescendants[Math.floor(Math.random() * possibleDescendants.length)];
  return numberOfChildren;
}

generateDescendants = (parentId, parentX, parentY) => {
  const children = determineNumberOfChildren();
  const totalRects = rabbits.length;
  while (rabbits.length < totalRects + children) {
    createRabbit(parentId, parentX, parentY);
  };
}

createNewGeneration = () => {
  currentGeneration = [];
  rabbitWidth = rabbitWidth * 2/3;
  rabbitHeight = rabbitHeight * 2/3;
  lastGen.forEach(function (rect) {
    generateDescendants(rect.id, rect.x, rect.y);
  });
  lastGen = currentGeneration.flat();
};

function isFloat(n){
  return Number(n) === n && n % 1 !== 0;
}

childrenCoord = (parentCoord) => {
  const parentCoordMax = parentCoord + canvas.width / 5;
  const parentCoordMin = parentCoord - canvas.width / 5;

  let childCoord = Math.random() * (parentCoordMax-parentCoordMin) + parentCoordMin;
  if (childCoord < rabbitWidth) childCoord = rabbitWidth;
  if (childCoord > canvas.width - rabbitWidth) childCoord = canvas.width - rabbitWidth;
  return childCoord;
};

firstGenCoord = () => {
  coord = Math.random() * canvas.width;
  if (coord < rabbitWidth) coord = rabbitWidth;
  if (coord > canvas.width - rabbitWidth) coord = canvas.width - rabbitWidth;
  return coord;
}

rabbitCollision = (newRabbit, existingRabbit) => {
  return !(
      ((newRabbit.y + newRabbit.h) < (existingRabbit.y)) ||
      (newRabbit.y > (existingRabbit.y + existingRabbit.h)) ||
      ((newRabbit.x + newRabbit.w) < existingRabbit.x) ||
      (newRabbit.x > (existingRabbit.x + existingRabbit.w))
  );
}

checkRabbitCollision = (rect) => {
  let validLocation = true;

  rabbits.forEach(function (item) {
    if (rabbitCollision(rect, item)) {
      validLocation = false;
    };
  });

  return validLocation;
};

generateRabbit = (coord, rabbit) => {
  context.fillRect(coord.x, coord.y, rabbitWidth, rabbitHeight);
  rabbits.push(rabbit);
  currentGeneration.push(rabbit);
};

createRabbit = (parentId, parentX, parentY) => {
  let coord = {x: null, y: null};
  let pId;
  context.fillStyle = 'silver';

  if (isFloat(parentX) && isFloat(parentY)) {
    coord.x = childrenCoord(parentX);
    coord.y = childrenCoord(parentY);
  } else {
    coord.x = firstGenCoord();
    coord.y = firstGenCoord();
  }

  const rabbit = {
      x: coord.x,
      y: coord.y,
      w: rabbitWidth,
      h: rabbitHeight,
      id: rabbits.length + 1,
      pId: parentId,
  }

  let validLocation = checkRabbitCollision(rabbit)
  if (validLocation) {
    generateRabbit(coord, rabbit)
  };
}

fitToContainer = () => {
  canvas.style.width ='100%';
  canvas.style.height='100%';
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
};

renderRabbitGenealogy = () => {
  fitToContainer();
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  while (rabbits.length < 3) {
    createRabbit();
    lastGen = rabbits;
  };
};

window.onload = renderRabbitGenealogy();
document.getElementById('generate-rabbits').addEventListener('click', createNewGeneration);
