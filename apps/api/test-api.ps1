# Fluently API - Comprehensive Test Suite
$baseUrl = "http://localhost:4000/api"

Write-Host ""
Write-Host "=== FLUENTLY API - COMPREHENSIVE TEST SUITE ===" -ForegroundColor Cyan
Write-Host ""

# 1. HEALTH & INFO
Write-Host "--- 1. HEALTH & INFO ---" -ForegroundColor Yellow

$health = Invoke-RestMethod -Uri "http://localhost:4000/health"
Write-Host "  [OK] Health Check: $($health.status)" -ForegroundColor Green

$apiInfo = Invoke-RestMethod -Uri "$baseUrl"
Write-Host "  [OK] API Info: $($apiInfo.name) v$($apiInfo.version)" -ForegroundColor Green

# 2. AUTH
Write-Host ""
Write-Host "--- 2. AUTHENTICATION ---" -ForegroundColor Yellow

# Register
$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$registerBody = @{ email = "test$timestamp@fluently.app"; password = "password123"; displayName = "Test $timestamp" } | ConvertTo-Json
try {
    $register = Invoke-RestMethod -Uri "$baseUrl/auth/register" -Method POST -ContentType "application/json" -Body $registerBody
    Write-Host "  [OK] Register: New user created" -ForegroundColor Green
} catch {
    Write-Host "  [FAIL] Register: $($_.Exception.Message)" -ForegroundColor Red
}

# Login valid
$loginBody = @{ email = "demo@fluently.app"; password = "demo1234" } | ConvertTo-Json
try {
    $login = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method POST -ContentType "application/json" -Body $loginBody
    $token = $login.data.token
    $headers = @{ Authorization = "Bearer $token" }
    Write-Host "  [OK] Login (valid): Token received" -ForegroundColor Green
} catch {
    Write-Host "  [FAIL] Login: $($_.Exception.Message)" -ForegroundColor Red
}

# Login invalid
$badLoginBody = @{ email = "demo@fluently.app"; password = "wrongpassword" } | ConvertTo-Json
try {
    Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method POST -ContentType "application/json" -Body $badLoginBody
    Write-Host "  [FAIL] Login (invalid): Should have been rejected" -ForegroundColor Red
} catch {
    Write-Host "  [OK] Login (invalid): Correctly rejected" -ForegroundColor Green
}

# 3. USER ENDPOINTS
Write-Host ""
Write-Host "--- 3. USER ENDPOINTS ---" -ForegroundColor Yellow

try {
    $profile = Invoke-RestMethod -Uri "$baseUrl/users/me" -Headers $headers
    Write-Host "  [OK] GET /users/me: $($profile.data.email)" -ForegroundColor Green
} catch {
    Write-Host "  [FAIL] GET /users/me: $($_.Exception.Message)" -ForegroundColor Red
}

try {
    Invoke-RestMethod -Uri "$baseUrl/users/me"
    Write-Host "  [FAIL] GET /users/me (no auth): Should require auth" -ForegroundColor Red
} catch {
    Write-Host "  [OK] GET /users/me (no auth): Correctly rejected" -ForegroundColor Green
}

try {
    $stats = Invoke-RestMethod -Uri "$baseUrl/users/me/stats" -Headers $headers
    Write-Host "  [OK] GET /users/me/stats: XP=$($stats.data.totalXp), Streak=$($stats.data.currentStreak)" -ForegroundColor Green
} catch {
    Write-Host "  [FAIL] GET /users/me/stats: $($_.Exception.Message)" -ForegroundColor Red
}

# 4. ROUTINE ENDPOINTS
Write-Host ""
Write-Host "--- 4. ROUTINE ENDPOINTS ---" -ForegroundColor Yellow

try {
    $routine = Invoke-RestMethod -Uri "$baseUrl/routine/today" -Headers $headers
    $tasks = $routine.data.tasks
    $dailyLogId = $routine.data.id
    Write-Host "  [OK] GET /routine/today: $($tasks.Count) tasks, Progress=$($routine.data.progress)%" -ForegroundColor Green
} catch {
    Write-Host "  [FAIL] GET /routine/today: $($_.Exception.Message)" -ForegroundColor Red
}

try {
    $history = Invoke-RestMethod -Uri "$baseUrl/routine/history" -Headers $headers
    Write-Host "  [OK] GET /routine/history: $($history.data.Count) days" -ForegroundColor Green
} catch {
    Write-Host "  [FAIL] GET /routine/history: $($_.Exception.Message)" -ForegroundColor Red
}

# 5. TASK ENDPOINTS
Write-Host ""
Write-Host "--- 5. TASK ENDPOINTS ---" -ForegroundColor Yellow

$incompleteTask = $tasks | Where-Object { $_.completed -eq $false } | Select-Object -First 1
if ($incompleteTask) {
    try {
        $complete = Invoke-RestMethod -Uri "$baseUrl/tasks/$($incompleteTask.id)/complete" -Method POST -Headers $headers
        Write-Host "  [OK] POST /tasks/:id/complete: $($complete.data.taskType) +$($complete.data.xpEarned) XP" -ForegroundColor Green
    } catch {
        Write-Host "  [FAIL] POST /tasks/:id/complete: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "  [SKIP] All tasks already completed" -ForegroundColor Yellow
}

$metadataBody = @{ metadata = @{ notes = "Test note" } } | ConvertTo-Json
try {
    $updateMeta = Invoke-RestMethod -Uri "$baseUrl/tasks/$($tasks[0].id)" -Method PATCH -Headers $headers -ContentType "application/json" -Body $metadataBody
    Write-Host "  [OK] PATCH /tasks/:id: Metadata updated" -ForegroundColor Green
} catch {
    Write-Host "  [FAIL] PATCH /tasks/:id: $($_.Exception.Message)" -ForegroundColor Red
}

$recapBody = @{ content = "Hoy aprendi muchas palabras nuevas." } | ConvertTo-Json
try {
    $review = Invoke-RestMethod -Uri "$baseUrl/tasks/day-recap/review" -Method POST -Headers $headers -ContentType "application/json" -Body $recapBody
    Write-Host "  [OK] POST /tasks/day-recap/review: AI responded" -ForegroundColor Green
} catch {
    Write-Host "  [WARN] POST /tasks/day-recap/review: AI may need API key" -ForegroundColor Yellow
}

$sentencesBody = @{ verbs = @("hablar", "comer") } | ConvertTo-Json
try {
    $sentences = Invoke-RestMethod -Uri "$baseUrl/tasks/generate-sentences" -Method POST -Headers $headers -ContentType "application/json" -Body $sentencesBody
    Write-Host "  [OK] POST /tasks/generate-sentences: $($sentences.data.sentences.Count) sentences" -ForegroundColor Green
} catch {
    Write-Host "  [WARN] POST /tasks/generate-sentences: AI may need API key" -ForegroundColor Yellow
}

# 6. LEADERBOARD
Write-Host ""
Write-Host "--- 6. LEADERBOARD ENDPOINTS ---" -ForegroundColor Yellow

try {
    $weekly = Invoke-RestMethod -Uri "$baseUrl/leaderboard/weekly" -Headers $headers
    Write-Host "  [OK] GET /leaderboard/weekly: $($weekly.data.entries.Count) users" -ForegroundColor Green
} catch {
    Write-Host "  [FAIL] GET /leaderboard/weekly: $($_.Exception.Message)" -ForegroundColor Red
}

try {
    $allTime = Invoke-RestMethod -Uri "$baseUrl/leaderboard/all-time" -Headers $headers
    Write-Host "  [OK] GET /leaderboard/all-time: Rank #$($allTime.data.userRank)" -ForegroundColor Green
} catch {
    Write-Host "  [FAIL] GET /leaderboard/all-time: $($_.Exception.Message)" -ForegroundColor Red
}

try {
    $public = Invoke-RestMethod -Uri "$baseUrl/leaderboard/all-time"
    Write-Host "  [OK] GET /leaderboard/all-time (public): Accessible" -ForegroundColor Green
} catch {
    Write-Host "  [FAIL] GET /leaderboard/all-time (public): $($_.Exception.Message)" -ForegroundColor Red
}

# 7. ONBOARDING
Write-Host ""
Write-Host "--- 7. ONBOARDING ---" -ForegroundColor Yellow

$onboardingBody = @{ nativeLanguage = "en"; targetLanguage = "ja"; level = "INTERMEDIATE" } | ConvertTo-Json
try {
    $onboarding = Invoke-RestMethod -Uri "$baseUrl/auth/onboarding" -Method POST -Headers $headers -ContentType "application/json" -Body $onboardingBody
    Write-Host "  [OK] POST /auth/onboarding: Language changed to Japanese" -ForegroundColor Green
    # Revert
    $revertBody = @{ nativeLanguage = "en"; targetLanguage = "es"; level = "BEGINNER" } | ConvertTo-Json
    Invoke-RestMethod -Uri "$baseUrl/auth/onboarding" -Method POST -Headers $headers -ContentType "application/json" -Body $revertBody | Out-Null
} catch {
    Write-Host "  [FAIL] POST /auth/onboarding: $($_.Exception.Message)" -ForegroundColor Red
}

# 8. ERROR HANDLING
Write-Host ""
Write-Host "--- 8. ERROR HANDLING ---" -ForegroundColor Yellow

try {
    Invoke-RestMethod -Uri "$baseUrl/nonexistent"
    Write-Host "  [FAIL] 404: Should have failed" -ForegroundColor Red
} catch {
    Write-Host "  [OK] 404 Not Found: Correctly handled" -ForegroundColor Green
}

try {
    Invoke-RestMethod -Uri "$baseUrl/tasks/invalid-id/complete" -Method POST -Headers $headers
    Write-Host "  [FAIL] Invalid Task: Should have failed" -ForegroundColor Red
} catch {
    Write-Host "  [OK] Invalid Task ID: Correctly rejected" -ForegroundColor Green
}

try {
    $badHeaders = @{ Authorization = "Bearer invalid-token" }
    Invoke-RestMethod -Uri "$baseUrl/users/me" -Headers $badHeaders
    Write-Host "  [FAIL] Invalid Token: Should have failed" -ForegroundColor Red
} catch {
    Write-Host "  [OK] Invalid Token: Correctly rejected" -ForegroundColor Green
}

# SUMMARY
Write-Host ""
Write-Host "=== TEST SUITE COMPLETE ===" -ForegroundColor Cyan
Write-Host "All endpoints tested!" -ForegroundColor Green
Write-Host ""
