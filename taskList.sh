#!/bin/bash

#Install node depenencies
npm i

PS3='Please enter your choice from 1-7 below: '
options=("Start_Program" "List_Tasks" "Add_Task" "Update_Task" "Delete_Task" "Search_By_Title" "Stop_The_Program")
select opt in "${options[@]}"
do
    case $opt in
        "Start_Program")
            echo "Program Start selected"
            node server.js &
            ;;
        "List_Tasks")
            echo "List Task Selected"
            curl http://localhost:3000/api/tasks
            ;;
        "Add_Task")
            echo "Add Task"
            read -p "Enter New Title : " title
            read -p "Enter New Date : " date
            curl -i -X POST --header "Content-Type: application/json" -d "{\"title\": \"$title\", \"dueDate\": \"$date\"}" http://localhost:3000/api/tasks
            ;;
        "Update_Task")
            echo "Update Task Selected"
            read -p "Enter Current Title : " currentTitle
            read -p "Enter New Title : " newTitle
            read -p "Enter New Date : " date
            curl -i -X PUT --header "Content-Type: application/json" -d "{\"title\": \"$newTitle\", \"dueDate\": \"$date\"}" http://localhost:3000/api/tasks/$currentTitle

            ;;
        "Delete_Task")
            echo "Delete Task Selected"
            read -p "Enter current Title : " currentTitle
            curl -i -X DELETE http://localhost:3000/api/tasks/$currentTitle

            ;;  
        "Search_By_Title")
            echo "Search by Title selected"
            read -p "Enter current Title : " currentTitle
            curl http://localhost:3000/api/tasks/$currentTitle
            ;;          
        "Stop_The_Program")
            sudo kill $(sudo lsof -t -i:3000)

            ;;
        *) echo "invalid option $REPLY \n";;
    esac
done