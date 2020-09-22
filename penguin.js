var penguinPromise = d3.json("classData.json");
var setBanner = function (message)
{
	d3.select("#banner")
	.text(message);
}

var drawTable = function(penguins)
			 
{
	//console.log("hi")
	var rows = d3.select("#penguinsTable tbody") 
	.selectAll("tr")
	.data(penguins)
	.enter()
	.append("tr")
	
	rows.append("td")
	.classed("one",true)
	.text(function(penguin)
	{
		return penguin.final[0].grade
	})
	
	

	
	rows.append("td")
	.classed("two",true)
	.text(getGradeshomework)
	
	rows.append("td")
	.classed("three",true)
	.text(getGradestest)
	
	rows.append("td")
	.classed("four",true)
	.text(getGradesquiz)
	
	rows.append("td")
	.append("img")
	.classed("five",true)
	.attr("src", function(penguins)
	{
		return ("imgs/"+penguins.picture)
	});
	

}
var getGradestest = function(penguin)
{
	console.log("hi")
	var getGrade = function(test)
	{
		return test.grade;
	}
	var getGrades = penguin.test.map(getGrade)
	return d3.mean(getGrades)
}

var getGradeshomework = function(penguin)
{
	console.log("hey")
	var getGrade3 = function(homework)
	{
		return homework.grade;
	}
	var getGrades3 = penguin.homework.map(getGrade3)
	return d3.mean(getGrades3)
}

var getGradesquiz = function(penguin)
{
	console.log("hello")
	var getGrade2 = function(quiz)
	{
		return quiz.grade;
	}
	var getGrades2 = penguin.quizes.map(getGrade2)
	return d3.mean(getGrades2)
}

var sortfcn = function(penguins){
	d3.select("#one")
	.on("click",function (penguin)
{
	d3.selectAll("tbody tr")
	.remove();
	
	penguins.sort(function (penguin1,penguin2)
{
	if (penguin1.final[0].grade == penguin2.final[0].grade)
		{
			return 0;
		}
	else if (penguin1.final[0].grade > penguin2.final[0].grade)
		{
			return 1;
		}
	else 
		{
			return -1;
		}

 })
		drawTable(penguins)
})

}




var successFcn = function(penguins)
{
	console.log("penguins",penguins)
	setBanner("Here are the penguins!")
	drawTable(penguins)
	sortfcn(penguins)
	
}
var failureFcn = function(error)
{
	console.log("error", error)
 setBanner ("The penguins are out :(")
}
penguinPromise.then(successFcn, failureFcn)