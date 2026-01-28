<?php
// state.php
// Shows state info and allows editing. POST will save changes to data/statesData.json (backups are created).

$statesFile = __DIR__ . '/data/statesData.json';
$backupDir = __DIR__ . '/data/backups';
@mkdir($backupDir, 0755, true);

function load_states(){
    global $statesFile;
    if (!file_exists($statesFile)) return [];
    $json = file_get_contents($statesFile);
    $data = json_decode($json, true);
    return $data ?: [];
}

function save_states($data){
    global $statesFile, $backupDir;
    // make a backup
    $time = date('Ymd-His');
    copy($statesFile, "$backupDir/statesData.$time.json.bak");
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    // atomic write
    $tmp = $statesFile . '.tmp';
    file_put_contents($tmp, $json);
    rename($tmp, $statesFile);
}

$states = load_states();

// handle save (extended fields)
$saveMessage = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['state_name'])){
    $stateName = $_POST['state_name'];
    // sanitize and collect fields
    $overview = isset($_POST['overview']) ? trim($_POST['overview']) : '';
    $tourism = isset($_POST['tourism']) ? array_values(array_filter(array_map('trim', explode("\n", $_POST['tourism'])))) : [];
    $districts = isset($_POST['districts']) ? array_values(array_filter(array_map('trim', explode("\n", $_POST['districts'])))) : [];
    $festivals = isset($_POST['festivals']) ? array_values(array_filter(array_map('trim', explode("\n", $_POST['festivals'])))) : [];
    $food = isset($_POST['food']) ? trim($_POST['food']) : '';
    $culture = isset($_POST['culture']) ? trim($_POST['culture']) : '';
    $history = isset($_POST['history']) ? trim($_POST['history']) : '';
    // key stats are given as one-per-line: "Label: value"
    $key_stats = [];
    if (isset($_POST['key_stats'])){
        $lines = array_filter(array_map('trim', explode("\n", $_POST['key_stats'])));
        foreach ($lines as $ln){
            $parts = explode(':', $ln, 2);
            if (count($parts) == 2){
                $key_stats[trim($parts[0])] = trim($parts[1]);
            }
        }
    }

    if ($stateName === ''){
        $saveMessage = 'Invalid state name';
    } else {
        // update or create
        $states[$stateName] = [
            'overview' => $overview,
            'districts' => $districts,
            'tourism' => $tourism,
            'food' => $food,
            'culture' => $culture,
            'festivals' => $festivals,
            'history' => $history,
            'key_stats' => $key_stats
        ];
        save_states($states);
        $saveMessage = 'Saved successfully';
    }
}

// display page
$name = isset($_GET['name']) ? $_GET['name'] : (isset($stateName) ? $stateName : '');
$display = isset($states[$name]) ? $states[$name] : null;
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title><?php echo htmlspecialchars($name ?: 'State'); ?></title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <link href="css/map-style.css" rel="stylesheet" />
  <style>
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      margin: 0; 
      padding: 20px; 
      min-height: 100vh;
    }
    .state-page { 
      max-width:1200px; 
      margin:0 auto; 
      padding:30px; 
      background: white; 
      border-radius: 15px; 
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
    .state-page h1{ 
      margin-top:0; 
      color: #2c3e50; 
      font-size: 2.5em; 
      text-align: center;
      border-bottom: 3px solid #3498db;
      padding-bottom: 15px;
      margin-bottom: 30px;
    }
    .back-link {
      display: inline-block;
      padding: 10px 20px;
      background: #3498db;
      color: white;
      text-decoration: none;
      border-radius: 25px;
      margin-bottom: 20px;
      transition: all 0.3s ease;
    }
    .back-link:hover {
      background: #2980b9;
      transform: translateY(-2px);
    }
    .state-field { 
      margin-bottom: 25px; 
      padding: 20px;
      background: #f8f9fa;
      border-radius: 10px;
      border-left: 4px solid #3498db;
    }
    .state-field strong { 
      color: #2c3e50; 
      font-size: 1.3em; 
      display: block;
      margin-bottom: 10px;
    }
    .state-field ul, .state-field p { 
      margin: 10px 0; 
      line-height: 1.6;
    }
    .state-field ul li { 
      margin: 8px 0; 
      padding: 8px 15px;
      background: white;
      border-radius: 5px;
      border-left: 3px solid #e74c3c;
    }
    .state-edit-form textarea{ 
      width:100%; 
      min-height:100px; 
      padding: 15px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-family: inherit;
      font-size: 14px;
      transition: border-color 0.3s ease;
    }
    .state-edit-form textarea:focus {
      outline: none;
      border-color: #3498db;
    }
    .state-actions { 
      margin-top: 20px; 
      text-align: center;
    }
    .state-actions button {
      background: #27ae60;
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 25px;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .state-actions button:hover {
      background: #219a52;
      transform: translateY(-2px);
    }
    .state-actions a {
      display: inline-block;
      margin-left: 10px;
      padding: 12px 30px;
      background: #95a5a6;
      color: white;
      text-decoration: none;
      border-radius: 25px;
      transition: all 0.3s ease;
    }
    .state-actions a:hover {
      background: #7f8c8d;
    }
    .msg { 
      padding:15px; 
      background: #d4edda; 
      border: 1px solid #c3e6cb; 
      margin-bottom:20px;
      border-radius: 8px;
      color: #155724;
      font-weight: 500;
    }
    .edit-link {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 25px;
      background: #f39c12;
      color: white;
      text-decoration: none;
      border-radius: 25px;
      transition: all 0.3s ease;
    }
    .edit-link:hover {
      background: #e67e22;
      transform: translateY(-2px);
    }
    .create-link {
      display: inline-block;
      padding: 10px 25px;
      background: #e74c3c;
      color: white;
      text-decoration: none;
      border-radius: 25px;
      transition: all 0.3s ease;
    }
    .create-link:hover {
      background: #c0392b;
      transform: translateY(-2px);
    }
    .state-field label {
      font-weight: 600;
      color: #2c3e50;
    }
  </style>
</head>
<body>
  <div class="state-page">
    <a class="back-link" href="index.php">← Back to map</a>
    <h1><?php echo htmlspecialchars($name ?: 'State'); ?></h1>

    <?php if ($saveMessage): ?>
      <div class="msg"><?php echo htmlspecialchars($saveMessage); ?></div>
    <?php endif; ?>

    <?php if (!$name): ?>
      <p>No state specified. Open this page using <code>?name=State%20Name</code>.</p>
    <?php else: ?>

      <?php if ($display): ?>
        <div id="viewMode">
          <div class="state-field">
            <strong>Overview:</strong>
            <p><?php echo nl2br(htmlspecialchars($display['overview'] ?? '')); ?></p>
          </div>
          <div class="state-field">
            <strong>Districts:</strong>
            <ul>
              <?php foreach ($display['districts'] ?? [] as $d): ?>
                <li><?php echo htmlspecialchars($d); ?></li>
              <?php endforeach; ?>
            </ul>
          </div>
          <div class="state-field">
            <strong>Tourism:</strong>
            <ul>
              <?php foreach ($display['tourism'] ?? [] as $t): ?>
                <li><?php echo htmlspecialchars($t); ?></li>
              <?php endforeach; ?>
            </ul>
          </div>
          <div class="state-field">
            <strong>Food habits:</strong>
            <p><?php echo htmlspecialchars($display['food'] ?? ''); ?></p>
          </div>
          <div class="state-field">
            <strong>Culture:</strong>
            <p><?php echo htmlspecialchars($display['culture'] ?? ''); ?></p>
          </div>
          <div class="state-field">
            <strong>Festivals:</strong>
            <ul>
              <?php foreach ($display['festivals'] ?? [] as $f): ?>
                <li><?php echo htmlspecialchars($f); ?></li>
              <?php endforeach; ?>
            </ul>
          </div>
          <div class="state-field">
            <strong>History:</strong>
            <p><?php echo nl2br(htmlspecialchars($display['history'] ?? '')); ?></p>
          </div>
          <div class="state-field">
            <strong>Key statistics:</strong>
            <ul>
              <?php foreach ($display['key_stats'] ?? [] as $k => $v): ?>
                <li><strong><?php echo htmlspecialchars($k); ?>:</strong> <?php echo htmlspecialchars($v); ?></li>
              <?php endforeach; ?>
            </ul>
          </div>
          <p><a class="edit-link" href="?name=<?php echo urlencode($name); ?>&edit=1">Edit this state</a></p>
        </div>
      <?php else: ?>
        <p>No data exists for <strong><?php echo htmlspecialchars($name); ?></strong>.</p>
        <p><a class="create-link" href="?name=<?php echo urlencode($name); ?>&edit=1">Create it</a></p>
      <?php endif; ?>

      <?php if (isset($_GET['edit']) && $_GET['edit'] == '1'): ?>
        <?php $d = $display ?: ['overview'=>'', 'districts'=>[], 'tourism'=>[], 'food'=>'', 'culture'=>'', 'festivals'=>[], 'history'=>'', 'key_stats'=>[]]; ?>
        <form class="state-edit-form" method="post">
          <input type="hidden" name="state_name" value="<?php echo htmlspecialchars($name); ?>" />
          <div class="state-field">
            <label><strong>Overview</strong><br>
              <textarea name="overview"><?php echo htmlspecialchars($d['overview']); ?></textarea>
            </label>
          </div>
          <div class="state-field">
            <label><strong>Districts (one per line)</strong><br>
              <textarea name="districts"><?php echo htmlspecialchars(implode("\n", $d['districts'])); ?></textarea>
            </label>
          </div>
          <div class="state-field">
            <label><strong>Tourism (one per line)</strong><br>
              <textarea name="tourism"><?php echo htmlspecialchars(implode("\n", $d['tourism'])); ?></textarea>
            </label>
          </div>
          <div class="state-field">
            <label><strong>Food</strong><br>
              <textarea name="food"><?php echo htmlspecialchars($d['food']); ?></textarea>
            </label>
          </div>
          <div class="state-field">
            <label><strong>Culture</strong><br>
              <textarea name="culture"><?php echo htmlspecialchars($d['culture']); ?></textarea>
            </label>
          </div>
          <div class="state-field">
            <label><strong>Festivals (one per line)</strong><br>
              <textarea name="festivals"><?php echo htmlspecialchars(implode("\n", $d['festivals'])); ?></textarea>
            </label>
          </div>
          <div class="state-field">
            <label><strong>History</strong><br>
              <textarea name="history"><?php echo htmlspecialchars($d['history']); ?></textarea>
            </label>
          </div>
          <div class="state-field">
            <label><strong>Key statistics (one per line as "Label: value")</strong><br>
              <textarea name="key_stats"><?php echo htmlspecialchars(implode("\n", array_map(function($k,$v){ return $k.": ".$v; }, array_keys($d['key_stats'] ?? []), array_values($d['key_stats'] ?? [])))); ?></textarea>
            </label>
          </div>
          <div class="state-actions">
            <button type="submit">Save</button>
            <a href="?name=<?php echo urlencode($name); ?>">Cancel</a>
          </div>
        </form>
      <?php endif; ?>

    <?php endif; ?>

  </div>
</body>
</html>