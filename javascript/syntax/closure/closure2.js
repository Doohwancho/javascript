//////////////////////////////
// Lecture : Closures

//an inner function has always access to the variables and parameters of its outer functions,
//even after the outer function has returned.

function retirement(retirementAge){
    var a = ' years left until retirements.';
    return function(yearOfBirth){
        var age = 2019 - yearOfBirth;
        console.log((retirementAge-age) + a); //retirement()가 끝났는데 아직 yearOfBirth변수(매개변수) 사용 가능
    }
}

var retirementUS = retirement(66);
var retirementGermany = retirement(65);
var retirementIceland = retirement(67);
// retirement(66)(1993);

retirementUS(1993);
retirementGermany(1993);
retirementIceland(1993);

function interviewQuestion(job){
    var designer_words = 'UX';
    var teacher_words = 'teach';
    var default_words = 'what do you do?';
    return function(name){
        switch(job){
            case 'designer':
                console.log(designer_words);
                break;
            case 'teacher':
                console.log(teacher_words);
                break;
            default:
                console.log(default_words);
                break;
        }
    }
}

var designer = interviewQuestion('designer');
designer('John');
designer('Cho');
interviewQuestion('teacher')('Marry');