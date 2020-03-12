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

                    w = GetProjectContent(repo)
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

    langColors =null
    
    $.ajax({
        'async': false,
        'global': false,
        'url': "languagesColors.json",
        'dataType': "json",
        'success': function (data) {
            langColors = data;
        }
    });

    console.log(langColors)
    
    ret='<div id="'+repo.id+'" class="project">\n\
            <div class="projectInfo">\n\
                <div class="projectName"><a href="'+repo.html_url+'" target="_blank">'+repo.name+'</a></div>\n\
                <div class="projectDescription">'+desc+'</div>\n\
           </div>\n\
           <p class="projectSocial">\n\
                <span> \n\
                    <span class="programmingLanguageColor" style="background-color:'+langColors[repo.language].color+'"></span>\n\
                    <span>'+repo.language+'</span>\n\
                </span>\n\
                <a href="'+repo.html_url+'/stargazers" class="muted-link" target="_blank">\n\
                <svg aria-label="stars" class="projectIcons" viewBox="0 0 14 16" version="1.1" width="14" height="16" role="img" style="">\n\
                    <path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z" style=""></path>\n\
                </svg>'+repo.stargazers_count+'</a>\n\
                <a href="'+repo.html_url+'/network/members" class="muted-link " target="_blank">\n\
                    <svg aria-label="forks" class="projectIcons" viewBox="0 0 10 16" version="1.1" width="10" height="16" role="img">\n\
                        <path fill-rule="evenodd" d="M8 1a1.993 1.993 0 00-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 002 1a1.993 1.993 0 00-1 3.72V6.5l3 3v1.78A1.993 1.993 0 005 15a1.993 1.993 0 001-3.72V9.5l3-3V4.72A1.993 1.993 0 008 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path>\n\
                    </svg>'+repo.forks_count+'</a>\n\
                </p>\n\
            </div>'


    return ret;

}