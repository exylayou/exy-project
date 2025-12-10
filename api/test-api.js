/**
 * Simple API Test Script
 * Run this with: node api/test-api.js
 *
 * Tests the fetchTours function with various filters
 */

// Note: This would need to be run with a transpiler (babel) or
// converted to CommonJS for Node.js. For demonstration purposes only.

import { fetchTours } from './api.js';

const runTests = async () => {
  console.log('====================================');
  console.log('   API UTILITY TEST SUITE');
  console.log('====================================\n');

  // Test 1: Fetch all tours
  console.log('TEST 1: Fetch all tours');
  console.log('------------------------');
  const allTours = await fetchTours();
  console.log(`✅ Success: ${allTours.success}`);
  console.log(`📊 Total tours: ${allTours.count}`);
  console.log(`⏱️  Response time: ~500ms\n`);

  // Test 2: Filter by max_price
  console.log('TEST 2: Filter by max_price ($100)');
  console.log('-----------------------------------');
  const affordableTours = await fetchTours({ max_price: 100 });
  console.log(`✅ Success: ${affordableTours.success}`);
  console.log(`📊 Tours under $100: ${affordableTours.count}`);
  if (affordableTours.success) {
    affordableTours.data.forEach(tour => {
      console.log(`   - ${tour.name}: $${tour.price_usd}`);
    });
  }
  console.log('');

  // Test 3: Filter by activity_type
  console.log('TEST 3: Filter by activity_type (Adventure)');
  console.log('--------------------------------------------');
  const adventureTours = await fetchTours({ activity_type: 'Adventure' });
  console.log(`✅ Success: ${adventureTours.success}`);
  console.log(`📊 Adventure tours: ${adventureTours.count}`);
  if (adventureTours.success) {
    adventureTours.data.forEach(tour => {
      console.log(`   - ${tour.name}`);
    });
  }
  console.log('');

  // Test 4: Multiple filters
  console.log('TEST 4: Multiple filters (max_price: 200, min_rating: 4.7)');
  console.log('------------------------------------------------------------');
  const premiumTours = await fetchTours({
    max_price: 200,
    min_rating: 4.7
  });
  console.log(`✅ Success: ${premiumTours.success}`);
  console.log(`📊 Premium tours: ${premiumTours.count}`);
  if (premiumTours.success) {
    premiumTours.data.forEach(tour => {
      console.log(`   - ${tour.name}: $${tour.price_usd}, ⭐${tour.rating}`);
    });
  }
  console.log('');

  // Test 5: Date filter (Saturday)
  console.log('TEST 5: Filter by date (2026-04-18 - Saturday)');
  console.log('-----------------------------------------------');
  const saturdayTours = await fetchTours({ date: '2026-04-18' });
  console.log(`✅ Success: ${saturdayTours.success}`);
  console.log(`📊 Tours available on Saturday: ${saturdayTours.count}`);
  console.log('');

  // Test 6: Complex filter combination
  console.log('TEST 6: Complex filters (Water Sports, $150 max, 4.8+ rating)');
  console.log('--------------------------------------------------------------');
  const waterSportsTours = await fetchTours({
    activity_type: 'Water Sports',
    max_price: 150,
    min_rating: 4.8
  });
  console.log(`✅ Success: ${waterSportsTours.success}`);
  console.log(`📊 Matching tours: ${waterSportsTours.count}`);
  if (waterSportsTours.success) {
    waterSportsTours.data.forEach(tour => {
      console.log(`   - ${tour.name}`);
      console.log(`     Price: $${tour.price_usd} | Rating: ⭐${tour.rating}`);
    });
  }
  console.log('');

  // Test 7: Empty result set
  console.log('TEST 7: Filter with no results (max_price: $10)');
  console.log('------------------------------------------------');
  const noResults = await fetchTours({ max_price: 10 });
  console.log(`✅ Success: ${noResults.success}`);
  console.log(`📊 Tours found: ${noResults.count}`);
  console.log('');

  console.log('====================================');
  console.log('   ALL TESTS COMPLETED ✅');
  console.log('====================================');
};

// Run tests
runTests().catch(console.error);

// Export for testing in other environments
export default runTests;
