#!/usr/bin/env python3
"""
Test script for Algorithm Visualizer Backend API
Run this after starting the backend to verify endpoints work
"""

import requests
import json
import time

BASE_URL = "http://localhost:8000"

def test_health():
    """Test health endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"✅ Health check: {response.status_code}")
        print(f"   Response: {response.json()}")
        return True
    except Exception as e:
        print(f"❌ Health check failed: {e}")
        return False

def test_algorithms():
    """Test algorithms listing endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/api/algorithms")
        print(f"✅ Algorithms list: {response.status_code}")
        algorithms = response.json()["algorithms"]
        print(f"   Found {len(algorithms)} algorithms:")
        for algo in algorithms:
            print(f"     - {algo['name']}: {algo['description']} ({algo['complexity']})")
        return True
    except Exception as e:
        print(f"❌ Algorithms list failed: {e}")
        return False

def test_bubble_sort():
    """Test bubble sort algorithm execution"""
    try:
        data = {
            "algorithm": "bubble_sort",
            "data": [64, 34, 25, 12, 22]
        }
        response = requests.post(f"{BASE_URL}/api/run", json=data)
        print(f"✅ Bubble sort: {response.status_code}")
        result = response.json()
        print(f"   Steps: {result['steps']}")
        print(f"   Complexity: {result['complexity']}")
        return True
    except Exception as e:
        print(f"❌ Bubble sort failed: {e}")
        return False

def test_binary_search():
    """Test binary search algorithm execution"""
    try:
        data = {
            "algorithm": "binary_search",
            "data": [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31],
            "target": 15
        }
        response = requests.post(f"{BASE_URL}/api/run", json=data)
        print(f"✅ Binary search: {response.status_code}")
        result = response.json()
        print(f"   Steps: {result['steps']}")
        print(f"   Complexity: {result['complexity']}")
        return True
    except Exception as e:
        print(f"❌ Binary search failed: {e}")
        return False

def main():
    """Run all tests"""
    print("🧪 Testing Algorithm Visualizer Backend API")
    print("=" * 50)
    
    # Wait for backend to be ready
    print("⏳ Waiting for backend to be ready...")
    time.sleep(2)
    
    tests = [
        test_health,
        test_algorithms,
        test_bubble_sort,
        test_binary_search
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        if test():
            passed += 1
        print()
    
    print("=" * 50)
    print(f"📊 Test Results: {passed}/{total} passed")
    
    if passed == total:
        print("🎉 All tests passed! Backend is working correctly.")
    else:
        print("⚠️  Some tests failed. Check backend logs for issues.")

if __name__ == "__main__":
    main()
