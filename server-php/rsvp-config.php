<?php

function connect() {
	$servername = "localhost";
	$username   = "rsvp";
	$password   = "rsvp";
	$dbname     = "rsvp";
	$conn       = new mysqli( $servername, $username, $password, $dbname );
	if ( $conn->connect_error ) {
		return null;
	}
	$conn->set_charset( "utf8" );

	return $conn;
}

?>