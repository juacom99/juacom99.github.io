/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {


    $("#projects").click(function ()
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
            
                    pl=$("#projecstList")
            
                    for (i in data)
                    {
                        repo=data[i];
                        if(repo.description)
                        {
                            desc=repo.description
                        }
                        else
                        {
                            desc="No description for this project"
                        }
                       pl.append('<div id="'+repo.id+'" class="project"><div class="projectName"><a href="'+repo.html_url+'" target="new">'+repo.name+'</a></div><div class="projectDescription">'+desc+'</div></div>');
                        
                    }
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    if (console && console.log) {
                        console.log("La solicitud a fallado: " + textStatus);
                    }
                });
            })
});


function processProjects()
{
    
}