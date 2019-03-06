var widget = $('#widget').data('els-cpaAssessment'); 
    var m = widget._model; 
    m.setCurrentQuestion(0); 
    for (var q = m.getQuestions(), ql = q.length, n = 0; ql > n; n++) { 
        var a = q[n].correctAnswers.slice(); 
        m.setCurrentQuestionAnswer(a); 
        m.updateSessionQuestionAnswer(a); 
        m.setNextQuestion(); 
    } 
    console.log('assessment score: %s%', m.getSession().getScore());
