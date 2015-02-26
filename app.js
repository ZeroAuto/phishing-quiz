var app = angular.module('quizApp', ['ui.bootstrap']);

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'template.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			}

			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				if(q) {
					scope.start_image = q.start_image
					scope.final_image = q.final_image
					scope.question = q.question;
					scope.options = q.options;
					scope.correct = q.correct
					scope.incorrect = q.incorrect
					scope.answer = q.answer;
					scope.answerMode = true;
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function() {
				if(!$('input[name=answer]:checked').length) return;

				var ans = $('input[name=answer]:checked').val();

				if(ans == scope.options[scope.answer]) {
					scope.score++;
					scope.correctAns = true;
				} else {
					scope.correctAns = false;
				}

				scope.answerMode = false;
			};

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
			}

			scope.reset();
		}
	}
});

app.controller('CarouselDemoCtrl', function ($scope) {
  $scope.myInterval = 3000;
  $scope.slides = [
  	{
  		image: "img/cynergistek-FINAL-JPG-Trans.jpg"
		},
  	{
  		image: "img/amazon-phish.jpg"
  	},
  	{
  		image: "img/pic006.jpg"
  	}
  ];
});

app.factory('quizFactory', function() {
	var questions = [
		{
			start_image: "img/bby_email.jpg",
			final_image: "img/bby_email_final.jpg",
			question: "Legit or phish?",
			options: ["Legit", "Phish"],
			answer: 1,
			correct: "Right, this is a phish",
			incorrect: "Sorry this is legit"
		},
		{
			start_image: "img/PhishingTrustedBank.png",
			final_image: "img/PhishingTrustedBank.png",
			question: "Legit or phish?",
			options: ["Legit", "Phish"],
			answer: 0,
			correct: "Right, this is a legit",
			incorrect: "Sorry this is a phish"
		},
		{
			start_image: "img/LinkedIn_118.png",
			final_image: "img/LinkedIn_118_final.png",
			question: "Legit or phish?",
			options: ["Legit", "Phish"],
			answer: 1,
			correct: "Right, this is a phish",
			incorrect: "Sorry this is legit"
		}
	];

	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
});