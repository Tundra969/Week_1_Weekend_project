var employeeArray = [];

$(document).ready(function(){
	$("#employeeinfo").submit(function(event){
		event.preventDefault();  //keep from putting info in default browser location or address bar

		var values = {};

		//console.log($("#employeeinfo").serializeArray());
		$.each($("#employeeinfo").serializeArray(), function(i, field){  //changes the values of input to the field name : field value  
			values[field.name] = field.value;  //reads better for humans
		})
		
		$("#employeeinfo").find("input[type=text]").val("");  //clears all text inputs on DOM
		//console.log(values);
		employeeArray.push(values);
		appendDom(values);
		totalSalary(employeeArray);
	});
	deleteEmployee();
});

function appendDom(employee){
	console.log(employee);
	$("#employeeContainer").append("<div class='employee' ></div>");  //add inputs to the html
	var $el = $("#employeeContainer").children().last();

	$el.append("<p>" + employee.employeename + "</p>");
	$el.append("<p>" + employee.employeenumber + "</p>");
	$el.append("<p>" + employee.jobtitle + "</p>");
	$el.append("<p>" + employee.salary + "</p>");
	$el.append("<button class='deleteemployee'>Delete Employee</button>");
}

function totalSalary(array){  //add all employee salaries together and show on DOM
	var totalMonthSalary = 0;
	for (i=0; i < array.length; i++){
		totalMonthSalary += ((array[i].salary)/12);
		console.log(totalMonthSalary);
	}
	$("span").replaceWith("<span>" + totalMonthSalary.toFixed(2) + "</span>");
	$("span").data("cost", totalMonthSalary);
	return totalMonthSalary;
}


function deleteEmployee(){
    $("#employeeContainer").on("click", ".deleteemployee", function(){
    	$(this).parent().remove();
    	var deletedemployee =  $(this).parent().data("employeedelete");

		for(var i=0; i<employeeArray; i++){
			if(employeeArray[i] == deletedemployee){
				employeeArray.splice(i);
			}
    	}

    });
}
