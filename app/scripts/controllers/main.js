'use strict';

/**
 * @ngdoc function
 * @name oNetApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the oNetApp
 */
angular.module('oNetApp')
  .controller('MainCtrl', function ($scope, $location, $route, $routeParams, Answer, Answers, Data, DataFetch, API_URL) {


    $scope.questions = [];
    $scope.answers = [];
    $scope.totalOrRemaining = "Total";
    $scope.barToggle = false;
    $scope.doughnutToggle = false;
    $scope.doughnutShowOrHide = "Show";
    $scope.barShowOrHide = "Show";
    $scope.solicitationStatus = 2;

    $scope.toggleQuestions = true;
    var totalQuery = {};

    $.getJSON( API_URL + '/data/total', function( json ) {
      $scope.opportunities = json;
      console.log( "JSON Data: " + json);
    });

    $scope.reloadRoute = function(){
      $route.reload();
    }

    $scope.firstOptions = [
      "Small",
      "Large"
    ];

    $scope.secondOptions = [
      "Civil (Department)",
      "Civil (Other)",
      "Finance and Insurance",
      "International",
      "Law Enforcement and Transit",
      "Military and Intelligence",
      "Space and Science",
      "Other"
    ];
    $scope.thirdOptions = [
      'Agriculture, Forestry, Fishing and Hunting',
      'Mining, Quarrying, and Oil and Gas Extraction',
      'Utilities',
      'Construction',
      'Wholesale Trade',
      'Information',
      'Finance and Insurance',
      'Real Estate and Rental and Leasing',
      'Professional, Scientific, and Technical Services',
      'Management of Companies and Enterprises',
      'Administrative and Support and Waste Management and Remediation Services',
      'Educational Services', 'Health Care and Socal Assistance',
      'Arts, Entertainment, and Recreation',
      'Accommodation and Food Services',
      'Other Services (except Public Administration)',
      'Public Administration',
      'Manufacturing',
      'Retail Trade',
      'Retail Trade',
      'Transportation and Warehousing'];

    //
    //
    //  "Accommodation and Food Services",
    //  "Administrative and Support and Waste Management, and Remediation Services",
    //  "Agriculture, Forestry, Fishing, and Hunting",
    //  "Arts, Entertainment, and Recreation",
    //  "Construction",
    //  "Educational Services",
    //  "Finance and Insurance",
    //  "Health Care and Social Assistance",
    //  "Information",
    //  "Management of Companies and Enterprises",
    //  "Mining, Quarrying, and Oil and Gas Extraction",
    //  "Professional, Scientific, and Technical Services",
    //  "Public Administration",
    //  "Real Estate and Rental and Leasing",
    //  "Utilities",
    //  "Wholesale Trade",
    //  "Other Services (except Public Administration)"
    //];

    $scope.toggleDoughnutLegend = function() {

      $scope.doughnutToggle = !($scope.doughnutToggle);
      if ($scope.doughnutToggle == false) {
        $scope.doughnutShowOrHide = "Show";
      }
      else {
        $scope.doughnutShowOrHide = "Hide";
      }

    }
    $scope.toggleBarLegend = function() {
      $scope.barToggle = !($scope.barToggle);
      if ($scope.barToggle == false) {
        $scope.barShowOrHide = "Show";
      }
      else {
        $scope.barShowOrHide = "Hide";
      }
    }
    $scope.searchPrevEntries = function searchPrevEntries(){
      var email = $('#email').val();
      Answers.query({"email":email}, function(result){
        $scope.previousSearchQuery = result;
        //if one was answered, repopulate first
        //if second ...
      })
    };

    $scope.firstAnswered = function(answer) {

      //$.getJSON( API_URL + '/question/2/options?answer1=' + totalQuery["answer1"], function( json ) {
      //  console.log(json[0].text);
      //  $scope.secondOptions = json[0].text;
      //});
      $scope.totalOrRemaining = "Remaining";
      $scope.showSecond = true;
      $scope.answer1 = answer;
      var firstAnswer = {"questionId": "1", "selectedOption": answer, "email": $('#email').val()};
      totalQuery["answer1"] = answer;
      Answer.save(firstAnswer, function(result) {
        $scope.responseFromFirstAnswer = true;
        $scope.businessSize = answer;
      });

      Data.get({questionId: 1, answer1: answer}, function (result){
        $scope.question1Data = result;
        $scope.opportunities = $scope.question1Data.total;
        $scope.initPie();
      });
    };

    $scope.secondAnswered = function(answer) {
      //$.getJSON( API_URL + '/question/3/options?answer1=' + totalQuery["answer1"] + '&answer2=' + totalQuery["answer2"] , function( json ) {
      //  console.log(JSON.stringify(json[0].text));
      //  //$scope.thirdOptions = json[0].text;
      //});
      $scope.answer2 = answer;
      $scope.showThird = true;
      var secondAnswer = {"questionId": "2", "selectedOption": answer, "email": $('#email').val()};
      totalQuery["answer2"] = answer;
      Answer.save(secondAnswer, function(result) {
        $scope.responseFromSecondAnswer = true;
      });

      Data.get({questionId: 2, answer1: $scope.answer1, answer2: answer}, function (result){
        $scope.question2Data = result;
        $scope.opportunities = $scope.question2Data.total;
        $scope.initDoughnut();
      });

    };

    $scope.thirdAnswered = function(answer) {
      $scope.answer3 = answer;
      $scope.showGoToResultsButton = true;
      var thirdAnswer = {"questionId": "3", "selectedOption": answer, "email": $('#email').val()};
      totalQuery["answer3"] = answer;
      $scope.showLast = true;

      findJobs();
      Answer.save(thirdAnswer, function(result) {
        $scope.responseFromThirdAnswer = true;
      });

      Data.get({questionId: 3, answer1: $scope.answer1, answer2: $scope.answer2, answer3: answer}, function (result){
        $scope.question3Data = result;

        $scope.initStackedBar();

      });
    };

    $scope.showResultsPage = function showResultsPage(){
      $scope.showResults = true;
    };

    $scope.backToSearch = function backToSearch(){
      $scope.showResults = false;
    }

    $scope.initPie = function(){
      var pieOptions = {
        tooltipTemplate: "<%if (label){%><%=label%><%}%>",
        responsive: true
      };
      var pieData = [];

      var total = $scope.question1Data.total;
      var marketData = $scope.question1Data.marketData;

      var colors = ['#1D7DC1', '#2290DE', '#409FE2', '#5DAEE7', '#7BBDEB', '#98CBF0', '#B6DAF4', '#D3E9F8', '#F1F8FD', '#FFFFFF' ];

      var i = 0;

      for (var elem in marketData) {
        pieData.push({
          value: marketData[elem]/total*360,
          label: elem,
          color: colors[i],
          opportunities: marketData[elem],
          highlight: "#D3E9F8"
        });

        i = i + 1;
      }
      var ctxv2 = document.getElementById("pieChart").getContext("2d");

      var pieChart = new Chart(ctxv2).Pie(pieData, pieOptions);

      var pieLegendString = "<ul style=\"list-style:none;\">";
      for (var i=0; i<pieData.length; i++) {
        pieLegendString = pieLegendString + "<li><span class=\"pie-graph-bull\" style=\"background-color:"+pieData[i].color+"\"></span>";
        pieLegendString = pieLegendString + pieData[i].label;
        pieLegendString = pieLegendString + "<span>"+pieData[i].opportunities+"</span></li>";
      }
      pieLegendString = pieLegendString + "</ul>";

      $("#pieLegend").html(pieLegendString);
    };

    $scope.initDoughnut = function(){

      var doughnutOptions = {
        tooltipTemplate: "<%if (label){%><%=label%><%}%>",
        responsive: true
      };

      var agencyData = $scope.question2Data.agencyData;
      var total = $scope.question2Data.total;

      $scope.doughnutData = [];
      var colors = ['#1D7DC1', '#2290DE', '#409FE2', '#5DAEE7', '#7BBDEB', '#98CBF0', '#B6DAF4', '#D3E9F8', '#F1F8FD', '#FFFFFF' ];

      var i = 0;

      for (var ment in agencyData) {
        $scope.doughnutData.push({
          value: agencyData[ment]/total*360,
          label: ment,
          color: colors[i],
          opportunities: agencyData[ment],
          highlight: "#D3E9F8"
        });

        i = i + 1;
      }

      var doughnutLegendString = "<ul style=\"list-style:none;\">";
      for (var i=0; i<$scope.doughnutData.length; i++) {
        doughnutLegendString = doughnutLegendString + $scope.doughnutData[i].label;
        doughnutLegendString = doughnutLegendString + "<li><span>" + $scope.doughnutData[i].opportunities+ "</span></li>";
      }
      doughnutLegendString = doughnutLegendString + "</ul>";

      $("#doughnut-legend").html(doughnutLegendString);


      var ctx5 = document.getElementById("doughnutChart").getContext("2d");
      $scope.myNewChart2 = new Chart(ctx5).Doughnut($scope.doughnutData, doughnutOptions);
    };

    $scope.initStackedBar = function(){
      $scope.stackedData = {};
      $scope.stackedData.datasets = [];
      var q2data = [];
      var stackedOptions = {
        responsive:true
      };

      var dougnutData = $scope.question2Data.agencyData;

      for (var agency in dougnutData) {
		  q2data.push(dougnutData[agency]);
      }

		  console.log(q2data);

      $scope.stackedData.datasets.push({
        label: $scope.question2Data.selectedMarket,
        fillColor: "rgba(29,125,193,0.2)",
        strokeColor: "rgba(29,125,193,0.2)",
        pointColor: "rgba(29,125,193,0.2)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(29,125,193,0.2)",
        data: q2data
      });

      var agencyData = $scope.question3Data.agencyData;

      var labels = [];
      $scope.doughnutData.labels = labels;

      for (var elem in agencyData) {
        labels.push(elem);
      }

	  var q3data = [];

      $scope.stackedData.labels = labels;
      for (var agency in agencyData) {
		  q3data.push(agencyData[agency]);
      }

      $scope.stackedData.datasets.push({
        label: $scope.question3Data.selectedMarket,
        fillColor: "rgba(94,168,69,0.2)",
        strokeColor: "rgba(94,168,69,0.2)",
        pointColor: "rgba(94,168,69,0.2)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(94,168,69,0.2)",
        data: q3data
      });

      var stackedLegendString1 = "<h3>" + $scope.stackedData.datasets[0].label + "</h3>";
      stackedLegendString1 = stackedLegendString1 + "<ul>";
      for(var k = 0;k<$scope.stackedData.labels.length;k++) {
        stackedLegendString1 = stackedLegendString1 + "<li>" + $scope.stackedData.labels[k];
        stackedLegendString1 = stackedLegendString1 + "<span>" + $scope.stackedData.datasets[0].data[k] + "</span></li>";
      }

      stackedLegendString1 = stackedLegendString1 + "</ul>";

      $("#bar-1-legend").html(stackedLegendString1);

      var stackedLegendString2 = "<h3>" + $scope.answer3 + "</h3>";
      stackedLegendString2 = stackedLegendString2 + "<ul>";
      for(var k = 0;k<$scope.stackedData.labels.length;k++) {
        stackedLegendString2 = stackedLegendString2 + "<li>" + $scope.stackedData.labels[k];
        stackedLegendString2 = stackedLegendString2 + "<span>" + $scope.stackedData.datasets[1].data[k] + "</span></li>";
      }

      stackedLegendString2 = stackedLegendString2 + "</ul>";

      $("#bar-2-legend").html(stackedLegendString2);

      var ctx7 = document.getElementById("stackedChart").getContext("2d");
      $scope.myNewChart2 = new Chart(ctx7).StackedBar($scope.stackedData, stackedOptions);
    };

    function findJobs(){
      DataFetch.get(totalQuery, function(opportunities){
        $scope.allOpportunities = opportunities;
        console.log($scope.allDepartments[$scope.allOpportunities.selectedMarket]);
        //$scope.agencies = ['Department of the Army'];
        $scope.agencies = $scope.allDepartments[$scope.allOpportunities.selectedMarket];
        $scope.whichDepartments = $scope.agencies.slice();
        console.log($scope.whichDepartments);

        $scope.agenciescheckbox = {};
        for (var each in $scope.agencies){
          $scope.agenciescheckbox[$scope.agencies[each]] = true;
        }
        $scope.smallFirm = {};
        for (var element in $scope.setAsides){
          $scope.smallFirm[$scope.setAsides[element]] = true;
        }
        $scope.whichFirms = $scope.setAsides.slice();
        console.log(JSON.stringify($scope.agenciescheckbox));
        $scope.totalQuery = totalQuery;
        console.log($scope.totalQuery);
        console.log(JSON.stringify($scope.smallFirm));
      });
    }

    angular.element(document).ready(function(){
      console.log($scope.agenciescheckbox);
    });


    $scope.filterAgency = function filterAgency(item){
      //console.log(agencies);
      //console.log(status);
      //console.log(item);
      if($scope.solicitationStatus == 2){
        if (totalQuery['answer1'] == 'Large') {
          return $.inArray(item.agency, $scope.whichDepartments) > -1;
        }
        else {
          return $.inArray(item.agency, $scope.whichDepartments) > -1 && $.inArray(item.setAside, $scope.whichFirms) > -1;
        }
      }
      else {
        if (totalQuery['answer1'] == 'Large') {
          return item.status === $scope.solicitationStatus && $.inArray(item.agency, $scope.whichDepartments) > -1;
        }
        else {
          return item.status === $scope.solicitationStatus && $.inArray(item.agency, $scope.whichDepartments) > -1 && $.inArray(item.setAside, $scope.whichFirms) > -1;
        }
      }
    };

    $scope.smallFirmChanged = function smallFirmChanged(setAside){
      console.log(setAside);
      var index = $scope.whichFirms.indexOf(setAside);
      console.log(index);
      if(index > -1){
        $scope.whichFirms.splice(index, 1);
      }
      else{
        $scope.whichFirms.push(setAside);
      }
      console.log($scope.whichFirms);
    };

    $scope.departmentsChanged = function departmentsChanged(department){

      console.log($scope.whichDepartments);
      console.log(department);

      var index = $scope.whichDepartments.indexOf(department);
      console.log(index);


      if(index > -1){

        $scope.whichDepartments.splice(index, 1);
      }
      else{
        $scope.whichDepartments.push(department);
      }
      console.log($scope.whichDepartments);
      console.log($scope.agencies);
    };

    $scope.solicitationStatus = "Presolicitation";

    $scope.toggleStatus = function toggleStatus(status){
      if(status==0){
        $scope.solicitationStatus = "Presolicitation";
        //updateOpportunities();
      }
      if(status==1){
        $scope.solicitationStatus = "Solicitation";
        //updateOpportunities();
      }
      if(status==2){
        $scope.solicitationStatus = 2;
      }
      console.log($scope.solicitationStatus);
    };

    $scope.setAsides = [
      "Total Small Business",
      "Service-Disabled Veteran-Owned Small Business",
      "HUBZone",
      "Competitive 8(a)",
      "Woman Owned Small Business",
      "Partial Small Business",
      "Veteran-Owned Small Business",
      "Economically Disadvantaged Woman Owned Small Business",
      "N/A"
    ];
    $scope.allDepartments = {
      "Military and Intelligence": [
        "Department of the Army",
        "Other Defense Agencies",
        "Department of the Navy",
        "Department of the Air Force",
        "Department of Veterans Affairs",
        "Office of the Director of National Intelligence",
        "Defense Information Systems Agency",
        "Defense Logistics Agency",
        "Defense Contract Management Agency"
      ],
      "Civil (Dept)": [
        "Department of Health and Human Services",
        "Department of Labor",
        "Department of the Interior",
        "Department of Agriculture",
        "Department of Commerce",
        "Department of Housing and Urban Development",
        "Department of Education",
        "Department of Energy",
        "Department of State"
      ],
      "Law Enforcement and Transit": [
        "Department of Homeland Security",
        "Court Services and Offender Supervision Agency",
        "Department of Justice",
        "Broadcasting Board of Governors",
        "United States Capitol Police",
        "Washington Metropolitan Area Transit Authority",
        "Department of Transportation",
        "Railroad Retirement Board"
      ],
      "Space and Science": [
        "Defense Nuclear Facilities Safety Board",
        "National Aeronautics and Space Administration",
        "National Science Foundation",
        "Nuclear Regulatory Commission",
      ],
      "Finance and Insurance": [
        "Department of the Treasury",
        "Federal Deposit Insurance Corporation",
        "United States Trade and Development Agency",
        "Consumer Product Safety Commission",
        "Consumer Financial Protection Bureau",
        "Pension Benefit Guaranty Corporation",
        "Securities and Exchange Commission",
        "Small Business Administration",
        "Social Security Administration"
      ],
      "Civil (Other)": [
        "Library of Congress",
        "United States Postal Service",
        "Federal Communications Commission",
        "Environmental Protection Agency",
        "Architect of the Capitol",
        "United States House of Representatives",
        "Corporation for National and Community Service",
        "Government Printing Office",
        "General Services Administration",
      ],
      "International": [
        "International Boundary Commission U.S. and Canada",
        "U.S.-China Economic & Security Review Commission",
        "Peace Corps",
        "Agency for International Development",
        "Overseas Private Investment Corporation"
      ],
      "Other": [
        "Smithsonian Institution",
        "Morris K. Udall Foundation"
      ]
    }
  });
