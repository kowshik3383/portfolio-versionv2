#!/bin/bash

# Blog Generation Cron Setup Script
# This script sets up a daily cron job to generate blogs automatically

# Get the absolute path to the portfolio directory
PORTFOLIO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Check if .env file exists
if [ ! -f "$PORTFOLIO_DIR/.env" ]; then
    echo "❌ .env file not found!"
    echo "Please create a .env file with your GEMINI_API_KEY first."
    echo "You can copy .env.example and add your API key."
    exit 1
fi

# Get the current user's crontab
CURRENT_CRONTAB=$(crontab -l 2>/dev/null)

# Define the new cron job (runs daily at 9 AM)
CRON_JOB="0 9 * * * cd $PORTFOLIO_DIR && pnpm run generate:blogs >> $PORTFOLIO_DIR/cron.log 2>&1"

# Check if the cron job already exists
if echo "$CURRENT_CRONTAB" | grep -q "generate:blogs"; then
    echo "⚠️  Blog generation cron job already exists!"
    echo "Current crontab:"
    echo "$CURRENT_CRONTAB" | grep "generate:blogs"
    echo ""
    echo "Do you want to replace it? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        # Remove old cron job and add new one
        NEW_CRONTAB=$(echo "$CURRENT_CRONTAB" | grep -v "generate:blogs")
        echo "$NEW_CRONTAB" | crontab -
        echo "$CRON_JOB" | crontab -
        echo "✅ Cron job updated!"
    else
        echo "❌ Setup cancelled."
        exit 0
    fi
else
    # Add new cron job
    if [ -z "$CURRENT_CRONTAB" ]; then
        echo "$CRON_JOB" | crontab -
    else
        (echo "$CURRENT_CRONTAB"; echo "$CRON_JOB") | crontab -
    fi
    echo "✅ Cron job added successfully!"
fi

# Show current crontab
echo ""
echo "📋 Current crontab:"
crontab -l | grep -E "(generate:blogs|^#)"

echo ""
echo "🎉 Setup complete!"
echo "📅 Blogs will be generated daily at 9:00 AM"
echo "📝 Logs will be saved to: $PORTFOLIO_DIR/cron.log"
echo ""
echo "To test the script manually, run:"
echo "cd $PORTFOLIO_DIR && pnpm run generate:blogs"
echo ""
echo "To view or edit the crontab:"
echo "crontab -e"