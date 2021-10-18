
    var questions = ["gender", "religion","profession","language","location","age","caste"];
    var main_data = {
      caste: [
        ["singh", "sing", "seeng", "sengh", "sin"],
        ["marwadi", "maradi", "marvadi", "marwati", "meradi", "marwade"],
        ["kayast", "kayasht", "kayest", "caste", "kayasath", "kaya", "cast"],
        ["brahman", "barahaman", "barahman", "braman", "bramin"],
        ["sunni", "sony", "suny", "sunny"],
        ["sheikh", "shaik", "shaik", "shake", "shek", "sheikh", "sher"],
        ["mohammad", "mohammed", "muhammed", "mohamed", "mohammat"],
        ["syed", "sayyad", "seyyed", "sayyed", "sayed", "said"],
        ["shia", "shah", "shaah"],
      ],
      gender: [
        ["male", "mal", "malu", "main", "mel", "mail", "men", "man","boy"],
        ["female", "femail", "fimal", "femin","woman","girl"],
      ],
      religion: [
        ["sikh", "sik", "seak", "seek", "sick", "seekh"],
        ["hindu", "hind", "hindhu", "hinda", "hendu", "hinder"],
        ["muslim", "muslem", "muslam", "musleem", "moslim", "mus"],
        ["bhuddist", "bhuddis", "buddist", "bhuddisth", "bhud"],
        ["christian", "cristian", "christan", "christin", "chris"],
      ],
      location: [
        ["hyderabad", "hyder", "hyderaba"],
        ["delhi", "daily", "deli", "del"],
        ["goa", "gauva", "go", "gowa", "gova", "gua"],
        ["mumbai", "mum", "mumba", "mombai", "bombay"],
        ["kerela", "karela", "kerel", "kerale"],
      ],
      profession: [
        ["engineer", "engineering", "engine", "engg", "gineer", "enggine"],
        ["artist", "act", "art", "acter", "actress", "atre"],
        ["scientist", "science", "scientific", "scientest"],
        ["cricketer", "cricket", "batman", "bowler", "cirik", "cricat"],
        ["writer", "novelist", "story writer", "series writer", "writar"],
        ["nurse", "compounder", "nurze", "sister"],
        ["teacher", "miss", "sir", "professor", "lecture", "lecturer"],
        ["programmer", "programer", "techee", "programmar"],
        ["fashion designer", "designer", "fasion designer"],
        ["driver", "traveller", "drivar"],
        ["doctor", "doc", "docto", "docc", "doctar", "doccotor"],
        ["architect", "arch", "arc", "archichit", "arcch", "archit", "chitect"],
        ["student", "stud", "stuent", "stu", "studant"],
        ["pilot", "pilat", "pilet", "pilo", "pile"],
        ["dentist", "dantist", "dentu", "dant", "dent"],
        ["chef", "chaf", "cook", "chief chef"],
      ],
      language: [
        ["hindi", "hinda", "hindee", "hind"],
        ["english", "eng"],
        ["tamil", "tamel"],
        ["urdu", "urd"],
        ["telugu", "tel"],
        ["bengali", "bengal"],
      ],
      age: [[20],[21],[22],[23],[24],[25],[26],[27],[28],[29],[30],[31],[32],[33],[34],[35],[36],[37],[38],[39],[40],[45],[50]]
    };
    var data = {
        profession_list: [
          "doctor",
          "engineer",
          "teacher",
          "business man",
          "nurse",
          "pilot",
          "police",
          "lawyer",
        ],
        religion_list: [
          "muslim",
          "hindu",
          "sikh",
          "jain",
          "bhuddist",
          "christian",
        ],
        location_list: [
            "hyderabad",
            "delhi",
            "mumbai",
            "jammu",
            "bangalore",
            "goa"]
      };

      init(data, questions);
        try{
      // $.ajax({
      //   url: '/get_nearest',
      //   type: 'GET',

      //   async: false,
      //   success: function (data) {
      //       main_data = data
      //       // gender_corpus = Object.values(data.gender)
      //   },
      //   error: function(xhr, textStatus, error){
      //       console.log(xhr.statusText);
      //       console.log(textStatus);
      //       console.log(error);
      //   },
      //   dataType: 'JSON',
      //   cache: false,
      //   contentType: false,
      //   processData: false
      // });

    }catch(e){
        console.log(e)
    }

    function demo(){
        const demo_words = 'hi, i am female writer from hyderabad, my age is twenty five, years'
        const extra = ' and my religion is hindu'
        demo_readOutLoud(demo_words)
        demo_readOutLoud(extra)
        setTimeout(()=>{
            document.getElementById('transcript').value = 'hi i am female writer from hyderabad my age is 25 years and my religion is hindu'
        },6800)
        // init(main_data,questions).sort(demo_words)
    }
    function demo_readOutLoud(e) {
          var t = new SpeechSynthesisUtterance();
          (t.text = e), (t.volume = 1), (t.rate = 0.83), (t.pitch = 1), window.speechSynthesis.speak(t);
      }

    function getQuery(user_data){
        var flag = false
        var qry = "select distinct * from wedlock_sm where "

        for(x in user_data){
                if(x == 'gender'){
                    if(user_data[x] == 'male'){
                        qry += `${x} = "female" `
                    }
                    else{
                        qry += `${x} = "male" `
                    }
                }
                else if(x == 'age'){
                    if(user_data['gender'] == 'male'){
                        qry += `${x} <= "${user_data[x]}" `
                    }
                    else{
                        qry += `${x} >= "${user_data[x]}" `
                    }
                }
                else{
                    qry += `${x} = "${user_data[x]}" `
                }
                if(Object.keys(user_data).indexOf(x) < Object.keys(user_data).length -1 ){
                    qry += " AND "
                }
        }
        qry += 'limit 10;'
        console.log(qry)
        return qry
    }
    function add_question(q){
        var new_question = q.toLowerCase()
        if(!questions.includes(new_question)){
            questions.push(new_question)
            $('#output').html('')
            for (x in questions) {
              take_input(questions[x]);
            }
        }
        else{
            questions.splice(questions.indexOf(new_question), 1);
            $('#output').html('')
            for (x in questions) {
              take_input(questions[x]);
            }
        }
    }
    function getCookie(e) {
      var name = e + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

     //clear cookies
    function clear_data() {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    function take_input(qposition) {

      var input1 = AlekyaVoice({
        nodename: qposition,
        data_array: main_data[qposition],
        auto_correct: true,
        main: main_data,
        new_word: true,
        output : 'output'
      });
    }
    for (x in questions) {
      take_input(questions[x]);
    }
    var sql_table  = ''

    function next(user_data,newdata) {
       if(flag_manual == false){
            if(search_keywords.length > 0){
                sort(search_keywords)
            }
        }
        search_keywords = ''
        flag_manual = false

        if(sorted_data.length == 0){
            readOutLoud_copm("we do not have records matching your data, here are some other profiles for you")
            sorted_data = wedlock_data.slice(0,9)
            document.getElementById('record_counts').innerHTML = 'no matching data but we found other profiles'
        }
        else{
            var cnt = sorted_data.length
            document.getElementById('record_counts').innerHTML = 'we found ' + cnt + ' records matching your data'
        }
      qry = getQuery(user_data,newdata)
      $('#qry').val(qry)


    $("#datatable_output").fadeIn()

       var cols = [

           {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            }]

            for(x=1;x< data_cols.length;x++)
            {cols.push({title: data_cols[x]})

            }

       sql_table = $('#sql_table').DataTable({
        data: sorted_data,
        pageLength : 5,

        columns: cols,
        'scrollX':true,
        "bDestroy": true,
        fixedColumns:   true
        // "dom": 'C<"clear">lfrtip'
      });





     // un-comment this to fetch data from database using ajax =======================================================================
    //   $('#qry_submit').click()
    //   if(newdata){
    //     if(data_count == 1){
    //         readOutLoud('We found ' + data_count +' record matching your given data' )
    //         $('#record_counts').text('We found ' + data_count +' record matching your given data')
    //     }
    //     else{
    //         readOutLoud('We found ' + data_count +' records matching your given data' )
    //         $('#record_counts').text('We found ' + data_count +' records matching your given data')
    //     }
    //   }
    }


   class voice_search{

        constructor(){
            this.qry = '';
            this.data =[];
            this.profiles = [];
            this.accepted = [];
            this.declined = [];
            this.bio = {};
            this.recognized = {}
            this.declined_keys = {
                        "not" : 1,
                        "dont" : 2
            };
            this.accepted_keys = ["want"];
            this.bio_keys = ["height", "weight", "age"];
        }
        setQry(qry){
            this.qry = qry
            this.data = qry.split(" ")
        }
         world_cluster(){
            console.log("Search query:", this.data.join(" "))
            this.data = this.remove_stop_words(this.data)
            this.data = this.check_nearest(this.data)
            this.recognize_keywords(this.data)


            for(var x in this.data){

                if(this.bio_keys.includes(this.data[x])){
                    if(this.hasNumber(this.data[this.data.indexOf(this.data[x]) -1])){
                        this.bio[this.data[x]] =  this.data[this.data.indexOf(this.data[x]) - 1]
                    }
                    else if(this.hasNumber(this.data[this.data.indexOf(this.data[x]) + 1])){
                        this.bio[this.data[x]] =  this.data[this.data.indexOf(this.data[x]) + 1]
                    }
                }

                if(this.data[x] in this.declined_keys){
                    if(!this.declined.includes(this.data[this.data.indexOf(this.data[x]) + this.declined_keys[this.data[x]]])){
                        this.declined.push(this.data[this.data.indexOf(this.data[x]) + this.declined_keys[this.data[x]]])
                    }
                }
                if(this.accepted_keys.includes(this.data[x])){
                    if(!this.accepted.includes(this.data[this.data.indexOf(this.data[x]) + 1])){
                        this.accepted.push(this.data[this.data.indexOf(this.data[x]) + 1])
                    }
                }
            }

            console.log("declined: ", this.declined)
            console.log("accepted: ", this.accepted)

            for(const prop in this.recognized){
                var temp = []
                for(x in this.recognized[prop]){
                    if(!this.declined.includes(this.recognized[prop][x])){
                        temp.push(this.recognized[prop][x])
                    }
                }
                this.recognized[prop] = temp;
            }

            console.log(this.bio)
            console.log(this.recognized)
            this.get_results()
        }

        hasNumber(myString) {
        return /\d/.test(myString);
        }

        get_bio(){
            return this.bio
        }



        recognize_keywords(data){

            for(var x in data){
                for(const prop in keywords_data){
                    if(keywords_data[prop].includes(data[x])){
                        if(!Object.keys(this.recognized).includes(prop)){
                            this.recognized[prop] = [];
                        }
                        if(!this.recognized[prop].includes(data[x])){
                            this.recognized[prop].push(data[x]);
                        }
                    }
                }
            }
          //this.data = this.recoognized
        }

        remove_stop_words(words){

            var temp = [];
            for(var x in words){
                if(!stop_words.includes(words[x])){
                    temp.push(words[x])
                }
            }
            return temp;
        };

        remove_keyword(word){
          for(const prop in this.recognized){
              var temp = [];
              for(var x = 0; x < this.recognized[prop].length; x++ ){
                  if(this.recognized[prop][x] != word){
                      temp.push(this.recognized[prop][x])
                  }
              }
              if(temp.length > 0){
                  this.recognized[prop] = temp
              }else{
                  delete this.recognized[prop]
              }

          }

        }

        get_recognized_keywords(){

            var temp = []
            for(const prop in this.recognized){
                for(var tag in  this.recognized[prop] ){
                    temp.push(prop + ":" + this.recognized[prop][tag] )
                }

            }
            for(const prop in this.bio){
                temp.push(prop + ":" + this.bio[prop] )
            }

            return temp
        }

        get_results(){

            var fist_filter = []
            for(var profile in wedlock_data){
                var status = true;
                for(const r in this.recognized){

                    if(!this.recognized[r].includes(wedlock_data[profile][data_cols.indexOf(r)])){
                        status = false;

                    }

                }

                if(status == true){
                    fist_filter.push(wedlock_data[profile])
                }
            }



            console.log(fist_filter)

            console.log(this.bio)
            var second_filter = []
            for(var x in fist_filter){
                var user = fist_filter[x][0]
                var stat = true;

                if(user in additional_info){

                for(var b in this.bio){
                    if(additional_info[user]["more"][b] != this.bio[b]){
                        stat = false;

                    }
                }
                if(stat == true){
                    if(!this.profiles.includes(user)){
                        second_filter.push(user)
                        }
                    }
                }
            }
            var res = []
            for(var profile in wedlock_data){
                if(second_filter.includes(wedlock_data[profile][0])){
                    res.push(wedlock_data[profile])
                }
            }

            console.log("Profiles found: ", second_filter)
            console.log(res)

            return res;
        }


        search_in_additional_info(){
            for(var x in wedlock_data){
                if(wedlock_data.join(" ").indexOf("bald head") != -1){
                    console.log("data", wedlock_data[x])
                }
                if(wedlock_data[x][0] in additional_info ){
                  console.log(Object.values(additional_info[wedlock_data[x][0]]["more"]).join(" "))
                    if(Object.values(additional_info[wedlock_data[x][0]]["more"]).join(" ").indexOf("   ")!= -1 ){
                        console.log(wedlock_data[x])
                    }
                }
            }
        }

        check_nearest(data){
            for(var x in data){
                for(const prop in nearly_matching_words){
                    for(var str in nearly_matching_words[prop]){
                        if(nearly_matching_words[prop][str].includes(data[x])){
                            data[x] = nearly_matching_words[prop][str][0]
                        }
                    }
                }
            }
            return data;
        }
}






    var Speechrecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var search_recognition = new Speechrecognition();

    $("#seach_table").click(function(){
        search_recognition.start()
    })


    search_recognition.onresult = function (event){
        var e = event.resultIndex;
        data = event.results[e][0].transcript.toLowerCase().split(" ")
        console.log(data)


        for(x in data){
        //sql_table.search( data[x] ).draw();
        //tags_transcript.push(data[x])

        //render_filter()


        }






        //var qry = "i want female marathi hindu brahmin height  , i want engineer not doctor"
        console.log(Qry)
        Qry.setQry(data.join(" "))
        Qry.world_cluster()
        var res = Qry.get_results()
        var recognized_keyword = Qry.get_recognized_keywords()
        reload_table(res)
        console.log(Qry)
         for(x in recognized_keyword){
            tags_transcript.push(recognized_keyword[x])
            //render_filter()
            var tag_input = $("#search_tags").tagify();
        }
        refresh_tags_input(tags_transcript.join(","))



    }



    function reload_table(Data){

        if(!Data){
            Data = wedlock_data
        }
        var cols = [

           {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            }
        ]

            for(var x=1;x< data_cols.length;x++)
            {
                cols.push({title: data_cols[x]})

            }


        sql_table =  $('#sql_table').DataTable({
        data: Data,
        pageLength : 5,
        fixedColumns:   true,
        columns: cols
        ,
        'scrollX':true,
        "bDestroy": true
      });



}
    reload_table(wedlock_data)


    function render_filter(){
        // console.log(sql_table.rows().data())
        sql_table.on('search.dt', function() {
        })
        reload_table(sql_table.rows( { filter : 'applied'} ).data().toArray())
    }

    function search_tag(){
        reload_table(wedlock_data)
        value = document.getElementById('search_tags').value.toLowerCase()
        console.log(value)

        var data = value.split(" ").join("").split(",")
        tags_transcript = data

        search_result = []

        console.log(data)
         for(x in data){
             var temp_search_tag = data[x]
             for(const prop in additional_info){
                 var values = Object.values(additional_info[prop]["more"])
                 for(x in values){
                     values[x] = values[x].split(" ").join("").toLowerCase()
                 }
            if(values.join(" ").indexOf(temp_search_tag) != -1){
               search_result.push(prop)
            }
        }


        }

        var temp_data = []
        for(x in wedlock_data){
            if(search_result.includes(wedlock_data[x][0])){
                temp_data.push(wedlock_data[x])
            }
        }
        reload_table(temp_data)

        // d = value.split(" ").join("").split(",")
        // for(x in d){
        //     sql_table.search( d[x] ).draw();
        //     render_filter()
        // }

    }

var tag_input = ''
var tags_transcript = []
var Qry = new voice_search()
function refresh_tags_input(v){
    $("#tags_input").text("")
    $("#tags_input").html(`<textarea placeholder='Search...' value='' id='search_tags' onkeyup='search_tag(this.value)' style='width:100px'>${v}</textarea>`)
    tag_input =  $("#search_tags").tagify()
    $(".tagify--noAnim").on("click",function(){
         var removed = $(this).text().split(":")
         if(removed.length > 0){
             remove_word = removed[1]
         }
         else{
             remove_word = removed[0]
         }


         Qry.remove_keyword(remove_word.split(" ").join(""))
         console.log(Qry)
         var res = Qry.get_results()

         reload_table(res)
         console.log(res)
        setTimeout(function(){

        value = document.getElementById('search_tags').value
        console.log(value)
        var data = value.split(" ").join("").split(",")
        tags_transcript = data
        refresh_tags_input(tags_transcript)
        },500)
})



}




refresh_tags_input("")





/* Formatting function for row details - modify as you need */
function format ( d ) {

    console.log(d)
    var add_info = additional_info[d[0]]
    console.log(add_info)
    // `d` is the original data object for the row
    var s = `<div style='background:#c3f4d6' class='m-0 p-2 rounded shadow-sm d-flex'><img style='height:150px;width:120px;object-fit:scale-down' src='${add_info["image"]}'><br><div class='d-flex flex-wrap'>`
       for(const prop in add_info["more"]){
                  s += `<p class=' no-wrap p-2 border border-dark rounded mx-4'>${prop}: ${add_info["more"][prop]}</p>`;
       }
    s += `</div></div>`
    return s;
}

 // Add event listener for opening and closing details
    $('#sql_table tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = sql_table.row( tr );

        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');



        }
    } );










