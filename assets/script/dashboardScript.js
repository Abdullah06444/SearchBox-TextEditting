<script type="text/javascript">

        <% if (typeof value != 'undefined') { %>

        console.log('<%- value %>')
            <% var fsmParseList = fsm.morphologicalAnalysis(value) %>
            <% for(var i=0; i< fsmParseList.size(); i++){ %>
                console.log('<%- fsmParseList.getFsmParse(i).getFsmParseTransitionList() %>')
            <% } %>
        <% } %>

        function fetchData(){
            let query = document.getElementById("myQuery").value;

            <% fsmParseList = fsm.morphologicalAnalysis("akın") %>
            <% for(i=0; i< fsmParseList.size(); i++){ %>
                console.log('<%- fsmParseList.getFsmParse(i).getFsmParseTransitionList() %>')
            <% } %>

            let emailvalue = '<%- email %>'
            let sentencevalue = '<%- sentence %>'
            console.log(emailvalue);
            console.log(sentencevalue);

            console.log('<%- sentence.getWord(1).getName() %>');
        }

        // prevent refresh page when click type="submit" button
        /*$(document).ready(function(){
            $("button").click(function(event){
                event.preventDefault();
            });
        });*/
    </script>