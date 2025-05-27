<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$offers_file = 'offers.json';

// Load offers
$offers = [];
if (file_exists($offers_file)) {
    $offers = json_decode(file_get_contents($offers_file), true) ?? [];
}

// Filter only active offers
$active_offers = array_filter($offers, function($offer) {
    return $offer['active'] === true;
});

// Sort by creation date (newest first)
usort($active_offers, function($a, $b) {
    return strtotime($b['created_at']) - strtotime($a['created_at']);
});

// Return JSON response
echo json_encode([
    'success' => true,
    'count' => count($active_offers),
    'offers' => array_values($active_offers)
], JSON_PRETTY_PRINT);
?>
