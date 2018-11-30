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

orderByGroup = (employees) => {
  const employeeGroups = {}
  employees.forEach(function(employee){
    const group = employee.group.toLowerCase()
    employeeGroups[group] === undefined ?
      employeeGroups[group] = [validateName(employee)] :
      employeeGroups[group].push(validateName(employee))
  });

  return sortGroupAlphabetically(employeeGroups)
}

validateName = (employee) => {
  if (employee.nameOrder == "reverse") return {name: employee.last + " " + employee.first}
  return {name: employee.first + " " + employee.last}
}

sortGroupAlphabetically = (employeeGroups) => {
  return Object.keys(employeeGroups)
        .sort()
        .reduce(function(acc, key) {
          acc[key] = employeeGroups[key];
          return acc;
        }, {});
}

console.log(orderByGroup(employees))
console.log(orderByGroup(employees2))

/*****************************************************************************************
* Bonus
****************************************************************************************/

// Bonus Anwser Here
