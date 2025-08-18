## ORB_OpeningRangeBreakout.mq5 — MT5 Expert Advisor

An Opening Range Breakout (ORB) Expert Advisor for MetaTrader 5 that trades breakouts of predefined opening ranges for New York and London sessions using local-time inputs (NY and London local times) with robust risk management, filters, and active trade management.

### Key Features
- Multiple sessions: New York (default 09:30–10:00 local NY) and London (default 07:30–08:00 local London), independently toggled
- Risk-based position sizing (percent equity per trade)
- Risk/Reward targeting, auto SL/TP
- Breakeven at configurable R, ATR-based trailing stop
- Daily and overall drawdown halts
- Entry filters: ORB width cap, min breakout distance, higher-TF MA trend, volume confirmation, cooldown
- One trade per session per day (configurable)
- Visual ORB levels on chart and live stats panel
- Alerts for breakouts and drawdown limits
- Asset-aware pip sizing heuristics (forex, JPY pairs, XAU)

### Installation
1. Copy `ORB_OpeningRangeBreakout.mq5` into your `MQL5/Experts` folder.
2. In MetaTrader 5, open MetaEditor and compile the EA.
3. Attach the EA to the desired symbol/timeframe chart (M1 or higher; M1 data improves ORB calculation accuracy).
4. Enable Algo Trading.

### Time Zones and Sessions
- Inputs for the session windows are in local New York and local London times (not broker/server time).
- The EA converts these to broker server time using built-in UTC offset and DST approximations:
  - NY DST: Starts 2nd Sunday in March, ends 1st Sunday in November
  - London DST: Starts last Sunday in March at 01:00 UTC, ends last Sunday in October at 01:00 UTC
- Verify broker/server offset alignment, especially around DST transitions, and adjust inputs if needed.

### Core Inputs (selected)
- `Enable New York/London Session`: Toggle sessions independently
- `NewYorkRangeStartLocal`, `NewYorkRangeEndLocal`: e.g., 09:30–10:00
- `LondonRangeStartLocal`, `LondonRangeEndLocal`: e.g., 07:30–08:00
- `RiskPerTradePercent`: Percent of equity to risk per trade
- `RiskRewardRatio`: TP distance = SL distance × RR
- `MaxTradesPerSession`: Default 1
- `MaxStopLossPips`: Skip trades if SL exceeds this (0 disables)
- `DailyDrawdownPercent`, `OverallDrawdownPercent`: Halts trading upon breach
- `MaxORBWidthPips`: Skip if ORB width exceeds this (0 disables)
- `MinBreakoutDistancePips`: Require price exceed ORB by at least this distance
- `TrendTF`, `MAPeriod`, `MAMethod`, `MAPrice`: Higher-TF MA trend filter (default D1 200 SMA)
- `VolumeConfirmation`: Require current bar volume > previous bar
- `CooldownMinutes`: Delay entering new trades after one executes
- `BreakevenAfterR`: Move SL to entry after reaching this R (0 disables)
- `ATRPeriod`, `ATRMultiplier`, `ATRTimeframe`, `TrailStartAfterR`: ATR trailing settings
- `MagicNumber`, `SlippagePoints`, `AllowShorts`, `AllowLongs`

### How It Works
1. During the session window, the EA records the high/low of the opening range (using M1 data).
2. After the window ends, the ORB levels are finalized and drawn.
3. When price breaks above/below the ORB by `MinBreakoutDistancePips` and all filters pass, the EA places a trade with SL at the opposite ORB level and TP by RR.
4. One trade per enabled session per day (configurable). Breakeven and ATR trailing manage open trades.
5. Daily/overall drawdown limits halt new trading. The daily state resets on broker server day change.

### Notes and Tips
- Attach to one chart per symbol you want to trade. Use unique `MagicNumber` per symbol/instance if needed.
- Ensure sufficient M1 history for the ORB window, or force a chart refresh/scroll-back.
- Pip heuristics are conservative. For non-standard symbols, verify tick size/value and pip assumptions in your broker specs.
- The stats panel (Comment) shows equity, drawdown, session windows, ORB levels, trades taken, and halt/cooldown flags.
- Backtest with “Every tick” or “1 minute OHLC” modeling for best ORB accuracy.

### Disclaimer
This EA is provided for educational purposes only. Trading involves risk. Test thoroughly in demo before live deployment. Ensure compliance with your broker’s execution policies and symbol specifications.

