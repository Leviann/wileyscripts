["tbs_testbank_questions", "tbs_assessment_questions", "assessment_questions", "testbank_questions", "knowledge_check_questions", "session_assessment_questions", "study_questions"].forEach(type=>{
    questionArray = [];
    lessonService.getAllLessons().forEach(lessonSer=>{
        var lesson = courseService.getContentByGuid(lessonSer.lessons["0"].guid);

        if (typeof lesson == "object") {

            Object.keys(lesson).forEach(key=>{

                [type].forEach(item=>{
                    if (key == item) {

                        questionArray = questionArray.concat(lesson[key].map(question=>{
                            return (question.descriptor)
                        }
                        ));

                    }
                }
                )
            }
            )

        }
    }
    )

    var uniq = questionArray.map((name)=>{
        return {
            count: 1,
            name: name
        }
    }
    ).reduce((a,b)=>{
        a[b.name] = (a[b.name] || 0) + b.count
        return a
    }
    , {});
    console.log(type);
    console.log(uniq);
}
)
