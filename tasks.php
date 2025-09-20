<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$file = __DIR__ . "/tasks.json";

if (!file_exists($file)) {
    file_put_contents($file, json_encode([]));
}

$tasks = json_decode(file_get_contents($file), true);
if (!is_array($tasks)) $tasks = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    if ($action === 'add' && !empty($_POST['task'])) {
        $tasks[] = ["text" => $_POST['task'], "done" => false];
    } elseif ($action === 'toggle' && isset($_POST['id'])) {
        $id = (int)$_POST['id'];
        if (isset($tasks[$id])) {
            $tasks[$id]['done'] = !$tasks[$id]['done'];
        }
    } elseif ($action === 'delete' && isset($_POST['id'])) {
        $id = (int)$_POST['id'];
        if (isset($tasks[$id])) {
            array_splice($tasks, $id, 1);
        }
    }

    file_put_contents($file, json_encode($tasks, JSON_PRETTY_PRINT));
}

header("Content-Type: application/json");
echo json_encode($tasks);
