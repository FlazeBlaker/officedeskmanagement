#!/bin/bash

# ==============================================================================
# Git Sync Script
# ==============================================================================
# This script automates the process of resetting a local branch to match the
# remote version, which is useful after a team member has force-pushed to
# fix merge conflicts.
#
# INSTRUCTIONS:
# 1. Save this file as "sync.sh" in the root of your project directory.
# 2. IMPORTANT: If your main branch is named "master", change the BRANCH_NAME
#    variable below from "main" to "master".
# 3. Open your terminal (like Git Bash on Windows) in the project directory.
# 4. Run the script by typing: ./sync.sh
# ==============================================================================

# --- CONFIGURATION ---
# Change this to "master" if your primary branch is named master.
BRANCH_NAME="main"

# --- SCRIPT START ---
echo " "
echo "🚀 Starting repository sync process..."
echo "----------------------------------------"

# Step 1: Stash any local changes (including new files)
echo " "
echo "Step 1: Saving your local changes to the stash..."
git stash -u
echo "✅ Local changes have been stashed."

# Step 2: Fetch the latest version from the server
echo " "
echo "Step 2: Fetching the latest updates from the server..."
git fetch origin
echo "✅ Fetched latest history."

# Step 3: Reset the local branch to match the server's version
echo " "
echo "Step 3: Resetting your local '$BRANCH_NAME' branch to match 'origin/$BRANCH_NAME'..."
git reset --hard "origin/$BRANCH_NAME"
echo "✅ Your local branch is now a perfect copy of the server version."

# Step 4: Re-apply your stashed work
echo " "
echo "Step 4: Re-applying your stashed changes..."
git stash pop
echo "✅ Your saved work has been applied."
echo " "
echo "----------------------------------------"
echo "🎉 Sync complete! Your repository is now up-to-date."
echo "You can now continue working. If there are any new merge conflicts, please resolve them."
echo " "
