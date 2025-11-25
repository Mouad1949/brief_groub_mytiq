🎟️ Plateforme de Gestion de Tickets & Événements – Brief Full-Stack

Ce projet est une application full-stack composée d’un backend Laravel et d’un frontend React, permettant de gérer des utilisateurs, des événements, des tickets, ainsi que l’envoi d’emails automatiques et un système de newsletter.

🚀 Fonctionnalités
🔹 Utilisateur

Création de compte + connexion (Laravel Sanctum)

Consultation de la liste des événements

Achat / prise de tickets

Génération automatique de tickets PDF

Réception d’emails automatiques (event + listener)

Abonnement / désabonnement à la newsletter

🔹 Administrateur

Création, modification et suppression d’événements

Gestion des utilisateurs

Consultation des tickets générés

Consultation des abonnés newsletter

Accès au tableau de bord avec statistiques

🛠️ Technologies Utilisées
Backend – Laravel

Laravel 10

Laravel Sanctum (authentification API)

MySQL (base de données)

Events & Listeners (emails automatiques)

Laravel Mail

DOMPDF (génération des tickets PDF)

Laravel Eloquent (ORM)

Validation Form Requests

Frontend – React

React + Vite

React Router DOM (navigation)

Axios (communication API Laravel)

React Hooks (useState, useEffect)

Context API ou Redux Toolkit (gestion globale)

TailwindCSS / MUI (interface moderne)

React Icons

📐 Conception
Diagramme de classes

Incluant les entités :

User (id, name, email, password, role)

Event (id, title, description, date, place, price)

Ticket (id, user_id, event_id, pdf_path)

Newsletter (id, email)

Diagramme de cas d’utilisation

Principaux cas :

S’inscrire

Se connecter

Consulter événements

Prendre un ticket

Recevoir un email

Gérer événements (admin)

Voir statistiques admin

Gérer newsletter

Maquettage Figma

Pages principales :

Login / Register

Home utilisateur

Liste des événements

Détails événement

Dashboard Admin

Gestion tickets / events / newsletter

🔗 Liens de Conception :
<a href="https://laalammouad.atlassian.net/jira/software/c/projects/MT/boards/101?sprintStarted=true" target="_blank" style="text-decoration:none;">
  <kbd>📋 Voir le Planning Jira</kbd>
</a>
<a href="https://lucid.app/lucidchart/3e9bf8ac-91c7-4a2f-a9ad-f36538900bb7/edit?beaconFlowId=15777D9EB6BAF4BD&invitationId=inv_8ca1cf16-f9ee-4da7-8c5e-b49f200831d4&page=0_0#" target="_blank" style="text-decoration:none;"> <kbd>📐 Voir le Diagramme UML</kbd>
</a>
<a href="https://www.figma.com/design/oZKO2giGQqFz0NYHtJpfxi/Untitled?node-id=0-1&t=BrHtrGRzw8iBMX45-1 " target="_blank" style="text-decoration:none;"> <kbd>🎨 Voir la Maquette Figma</kbd>
</a>

