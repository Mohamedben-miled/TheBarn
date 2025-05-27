<?php
session_start();

// Simple authentication (you should use a proper authentication system)
$admin_username = 'admin';
$admin_password = 'thebarn2025'; // Change this password!

// Check if user is logged in
if (!isset($_SESSION['admin_logged_in'])) {
    if ($_POST['username'] ?? '' === $admin_username && $_POST['password'] ?? '' === $admin_password) {
        $_SESSION['admin_logged_in'] = true;
    } else {
        // Show login form
        ?>
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>The Barn Admin - Login</title>
            <link rel="stylesheet" href="../css/admin-styles.css">
        </head>
        <body>
            <div class="login-container">
                <div class="login-form">
                    <h2>🌿 The Barn Admin</h2>
                    <form method="POST">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" id="username" name="username" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" name="password" required>
                        </div>
                        <button type="submit" class="login-btn">Login</button>
                    </form>
                </div>
            </div>
        </body>
        </html>
        <?php
        exit;
    }
}

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: dashboard.php');
    exit;
}

// Handle offer management
$offers_file = 'offers.json';

// Load existing offers
$offers = [];
if (file_exists($offers_file)) {
    $offers = json_decode(file_get_contents($offers_file), true) ?? [];
}

// Handle form submissions
if ($_POST['action'] ?? '' === 'add_offer') {
    $new_offer = [
        'id' => uniqid(),
        'title' => $_POST['title'] ?? '',
        'description' => $_POST['description'] ?? '',
        'discount' => $_POST['discount'] ?? '',
        'valid_until' => $_POST['valid_until'] ?? '',
        'active' => true,
        'created_at' => date('Y-m-d H:i:s')
    ];
    $offers[] = $new_offer;
    file_put_contents($offers_file, json_encode($offers, JSON_PRETTY_PRINT));
}

if ($_POST['action'] ?? '' === 'delete_offer') {
    $offer_id = $_POST['offer_id'] ?? '';
    $offers = array_filter($offers, function($offer) use ($offer_id) {
        return $offer['id'] !== $offer_id;
    });
    file_put_contents($offers_file, json_encode(array_values($offers), JSON_PRETTY_PRINT));
}

if ($_POST['action'] ?? '' === 'toggle_offer') {
    $offer_id = $_POST['offer_id'] ?? '';
    foreach ($offers as &$offer) {
        if ($offer['id'] === $offer_id) {
            $offer['active'] = !$offer['active'];
            break;
        }
    }
    file_put_contents($offers_file, json_encode($offers, JSON_PRETTY_PRINT));
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Barn Admin Dashboard</title>
    <link rel="stylesheet" href="../css/admin-styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="admin-container">
        <header class="admin-header">
            <div class="header-content">
                <h1>🌿 The Barn Admin Dashboard</h1>
                <div class="header-actions">
                    <span>Welcome, Admin</span>
                    <a href="?logout=1" class="logout-btn">Logout</a>
                </div>
            </div>
        </header>

        <main class="admin-main">
            <div class="dashboard-grid">
                <!-- Add New Offer -->
                <div class="card">
                    <h2>📢 Add New Offer</h2>
                    <form method="POST" class="offer-form">
                        <input type="hidden" name="action" value="add_offer">
                        
                        <div class="form-group">
                            <label for="title">Offer Title</label>
                            <input type="text" id="title" name="title" placeholder="e.g., Summer Special Discount" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea id="description" name="description" placeholder="Describe your offer..." required></textarea>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="discount">Discount</label>
                                <input type="text" id="discount" name="discount" placeholder="e.g., 20% OFF" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="valid_until">Valid Until</label>
                                <input type="date" id="valid_until" name="valid_until" required>
                            </div>
                        </div>
                        
                        <button type="submit" class="add-btn">
                            <i class="fas fa-plus"></i> Add Offer
                        </button>
                    </form>
                </div>

                <!-- Current Offers -->
                <div class="card">
                    <h2>📋 Current Offers (<?= count($offers) ?>)</h2>
                    
                    <?php if (empty($offers)): ?>
                        <div class="no-offers">
                            <i class="fas fa-inbox"></i>
                            <p>No offers yet. Create your first offer!</p>
                        </div>
                    <?php else: ?>
                        <div class="offers-list">
                            <?php foreach ($offers as $offer): ?>
                                <div class="offer-item <?= $offer['active'] ? 'active' : 'inactive' ?>">
                                    <div class="offer-content">
                                        <h3><?= htmlspecialchars($offer['title']) ?></h3>
                                        <p><?= htmlspecialchars($offer['description']) ?></p>
                                        <div class="offer-meta">
                                            <span class="discount"><?= htmlspecialchars($offer['discount']) ?></span>
                                            <span class="valid-until">Valid until: <?= htmlspecialchars($offer['valid_until']) ?></span>
                                        </div>
                                    </div>
                                    
                                    <div class="offer-actions">
                                        <form method="POST" style="display: inline;">
                                            <input type="hidden" name="action" value="toggle_offer">
                                            <input type="hidden" name="offer_id" value="<?= $offer['id'] ?>">
                                            <button type="submit" class="toggle-btn <?= $offer['active'] ? 'active' : 'inactive' ?>">
                                                <i class="fas fa-<?= $offer['active'] ? 'eye' : 'eye-slash' ?>"></i>
                                                <?= $offer['active'] ? 'Active' : 'Inactive' ?>
                                            </button>
                                        </form>
                                        
                                        <form method="POST" style="display: inline;" onsubmit="return confirm('Are you sure you want to delete this offer?')">
                                            <input type="hidden" name="action" value="delete_offer">
                                            <input type="hidden" name="offer_id" value="<?= $offer['id'] ?>">
                                            <button type="submit" class="delete-btn">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                </div>

                <!-- Quick Stats -->
                <div class="card stats-card">
                    <h2>📊 Quick Stats</h2>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <div class="stat-number"><?= count($offers) ?></div>
                            <div class="stat-label">Total Offers</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number"><?= count(array_filter($offers, fn($o) => $o['active'])) ?></div>
                            <div class="stat-label">Active Offers</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number"><?= count(array_filter($offers, fn($o) => !$o['active'])) ?></div>
                            <div class="stat-label">Inactive Offers</div>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="card">
                    <h2>⚡ Quick Actions</h2>
                    <div class="quick-actions">
                        <a href="../index.html" target="_blank" class="action-btn">
                            <i class="fas fa-external-link-alt"></i>
                            View Website
                        </a>
                        <a href="offers-api.php" target="_blank" class="action-btn">
                            <i class="fas fa-code"></i>
                            View Offers API
                        </a>
                        <button onclick="location.reload()" class="action-btn">
                            <i class="fas fa-sync-alt"></i>
                            Refresh Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script>
        // Auto-refresh offers every 30 seconds
        setInterval(() => {
            const offersSection = document.querySelector('.offers-list');
            if (offersSection) {
                // You could implement AJAX refresh here
            }
        }, 30000);

        // Add some interactivity
        document.querySelectorAll('.offer-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-2px)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0)';
            });
        });
    </script>
</body>
</html>
