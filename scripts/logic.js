/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {


    $("#projects").click(onProjectClick)

    $("#about").click(function ()
    {
        $("#content").html('');
    })


    $('#sidebar').hover(function () {
        $(this).animate({width: '100%'}, 500);
        $(this).html('<ul>\n\
                        <li id="about">About Me</li>\n\
                        <li id="projects">Project</li>\n\
                      </ul>')
        $("#projects").click(onProjectClick)
        $("#about").click(function ()
        {
            $("#content").html('');
        })

    }, function () {
        $(this).html("");
        $(this).animate({width: '55px'}, 500);
    }).trigger('mouseleave');

});


function onProjectClick()
{
    $.ajax({
        //Cambiar a type: POST si necesario
        type: "GET",
        // Formato de datos que se espera en la respuesta
        dataType: "json",
        // URL a la que se enviará la solicitud Ajax
        url: "https://api.github.com/users/juacom99/repos",
    })
            .done(function (data, textStatus, jqXHR) {

                $("#content").html('<div id="projecstList"></div>');

                pl = $("#projecstList")

                for (i in data)
                {
                    repo = data[i];
                   /* if (repo.description)
                    {
                        desc = repo.description
                    } else
                    {
                        desc = "No description for this project"
                    }
                    
                    pl.append('<div id="' + repo.id + '" class="project">\n\
                               <div class="projectInfo"> \n\
                                    <div class="projectName"><a href="' + repo.html_url + '" target="new">' + repo.name + '</a>\n\
                                    </div><div class="projectDescription">' + desc + '</div>\n\
                               </div> </div>');*/
                    
                    w=GetProjectContent(repo)
                    console.log(repo)
                    pl.append(w)
                }


            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                if (console && console.log) {
                    console.log("La solicitud a fallado: " + textStatus);
                }
            });
}


function GetProjectContent(repo)
{
    if (repo.description)
    {
        desc = repo.description
    } else
    {
        desc = "No description for this project"
    }


    ret = '<div id="'+repo.id+'" class="project">\n\
            <div class="projectInfo">\n\
                <div class="projectName"><a href="'+repo.html_url+'" target="new">'+repo.name+'</a></div>\n\
                <div class="projectDescription">'+desc+'</div>\n\
            </div>\n\
            <div class="" style="padding-left: 16px;vertical-align: middle;">\n\
                <span class="programmingLanguageIcon" style="background-color: #ff0000;"></span>\n\
                <span class="programmingLanguage">'+repo.language+'</span>\n\
            </div>\n\
        </div>'
    
    return ret;

}