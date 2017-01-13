<?php
include_once "rsvp-config.php";
header( 'Content-Type: application/json;charset=utf-8' );
header( 'Access-Control-Allow-Origin: *' );

function queryLastEvent() {
	$accessCode = '';
	if ( ! empty( $_GET['access-code'] ) ) {
		$accessCode = $_GET['access-code'];
	}

	$conn = connect();

	// fetch last event
	$stmt = $conn->prepare( "SELECT event_id, name, event_date, location, access_code FROM events WHERE event_date = (SELECT MAX(event_date) FROM events) LIMIT 1" );
	$stmt->execute();
	$event = new stdClass();
	$stmt->bind_result( $event->event_id, $event->name, $event->event_date, $event->location, $event->access_code );
	if ( ! $stmt->fetch() ) {
		$event = null;
	}
	$stmt->close();

	// check result
	if ( empty( $event ) ) {
		throw new RuntimeException( 'No Events Found' );
	}
	if ( ! empty( $event->access_code ) && ( $event->access_code !== $accessCode ) ) {
		throw new RuntimeException( 'Invalid Access Code' );
	}

	// fetch all guests
	$stmt = $conn->prepare( "SELECT guest_id, name, table_number, num_guests, new_table_number, new_num_guests, new_arrival_time, new_handled_by FROM guests WHERE event_id=?" );
	$stmt->bind_param( "i", $event->event_id );
	$stmt->execute();
	$guest = new stdClass();
	$stmt->bind_result( $guest->guest_id, $guest->name, $guest->table_number, $guest->num_guests, $guest->new_table_number, $guest->new_num_guests, $guest->new_arrival_time, $guest->new_handled_by );
	$guests = array();
	while ( $stmt->fetch() ) {
		$guests[] = $guest;
		$guest    = new stdClass();
		$stmt->bind_result( $guest->guest_id, $guest->name, $guest->table_number, $guest->num_guests, $guest->new_table_number, $guest->new_num_guests, $guest->new_arrival_time, $guest->new_handled_by );
	}
	$stmt->close();

	return json_encode( array( 'event' => $event, 'guests' => $guests ), JSON_UNESCAPED_UNICODE );
}

function submitGuest() {
	if ( ! isset( $_POST["guestId"] ) || ! is_numeric( $_POST["guestId"] ) ) {
		throw new RuntimeException( 'Invalid Guest Number' );
	}
	$guestId        = intval( $_POST["guestId"] );
	$newTableNumber = null;
	if ( ! empty( $_POST['newTableNumber'] ) ) {
		$newTableNumber = $_POST['newTableNumber'];
	}
	$newNumGuests = null;
	if ( isset( $_POST["newNumGuests"] ) && is_numeric( $_POST["newNumGuests"] ) ) {
		$newNumGuests = intval( $_POST["newNumGuests"] );
	}
	$newArrivalTime = null;
	if ( ! empty( $_POST['newArrivalTime'] ) ) {
		$dateObj = DateTime::createFromFormat( 'H:i:s', $_POST['newArrivalTime'] );
		if ( $dateObj === false ) {
			throw new RuntimeException( 'Invalid Time' );
		}
		$newArrivalTime = date( "H:i:s", strtotime( $_POST['newArrivalTime'] ) );
	}
	$newHandledBy = null;
	if ( ! empty( $_POST['newHandledBy'] ) ) {
		$newHandledBy = $_POST['newHandledBy'];
	}

	$conn = connect();

	$result = null;
	$stmt   = $conn->prepare( 'UPDATE guests SET new_table_number = ?, new_num_guests = ?, new_arrival_time = ?, new_handled_by = ? WHERE guest_id = ?' );
	$stmt->bind_param( "sissi", $newTableNumber, $newNumGuests, $newArrivalTime, $newHandledBy, $guestId );
	$stmt->execute();
	$stmt->close();

	return "{}";
}

// ***************** start - route action to specific handler ************************ //
try {
	if ( ! empty( $_GET["action"] ) && ( $_GET["action"] == 'query-last-event' ) ) {
		$res = queryLastEvent();
	} else if ( ! empty( $_POST["action"] ) && ( $_POST["action"] == 'submit-guest' ) ) {
		$res = submitGuest();
	} else {
		throw new RuntimeException( 'Cannot process action' );
	}
	http_response_code( 200 );

} catch ( Exception $e ) {
	http_response_code( 400 );
	$res = json_encode( array( 'error' => true, 'msg' => $e->getMessage() ) );
}

// return result
echo $res;
?>