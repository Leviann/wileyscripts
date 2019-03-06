["tbs_testbank_questions", "tbs_assessment_questions", "assessment_questions", "testbank_questions", "knowledge_check_questions", "session_assessment_questions", "study_questions"].forEach(type=>{
    questionArray = [];
    lessonService.getAllLessons().forEach(lessonSer=>{
        var lesson = courseService.getContentByGuid(lessonSer.lessons["0"].guid);

        if (typeof lesson == "object") {

            questionArray = questionArray.concat(lesson.testbank_questions.map(question=>{
                return {
                    group: question["group_by_id"],
                    id: question.identifier
                }
            }
            ))
        }

    }
    )

}
)

var uniq = questionArray.map((name)=>{
    return {
        count: 1,
        name: name.group,
        id: name.id
    }
}
).reduce((a,b)=>{
    if (typeof a[b.name] != "undefined") {

        a[b.name] = {
            count: (a[b.name].count || 0) + b.count,
            ids: a[b.name].ids.concat(b.id)
        };
    } else {
        a[b.name] = {
            count: 1,
            ids: [].concat(b.id)
        }

    }

    return a
}
, {});

var arrData = null;
console.log("Group|identifiers");
Object.keys(uniq).forEach(group=>{
    console.log(group + "|" + uniq[group].ids)
}
)
