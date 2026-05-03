export const PATTERNS = [
  { id: 'arrays', label: 'Arrays', icon: '📦', color: '#14b8a6' },
  { id: 'strings', label: 'Strings', icon: '🔤', color: '#3b82f6' },
  { id: 'two-pointers', label: 'Two Pointers', icon: '👆', color: '#8b5cf6' },
  { id: 'sliding-window', label: 'Sliding Window', icon: '🪟', color: '#f59e0b' },
  { id: 'binary-search', label: 'Binary Search', icon: '🔍', color: '#ef4444' },
  { id: 'linked-list', label: 'Linked List', icon: '🔗', color: '#ec4899' },
  { id: 'stack-queue', label: 'Stack & Queue', icon: '📚', color: '#06b6d4' },
  { id: 'trees', label: 'Trees & BST', icon: '🌳', color: '#22c55e' },
  { id: 'graphs', label: 'Graphs & BFS/DFS', icon: '🕸️', color: '#a855f7' },
  { id: 'dynamic-programming', label: 'Dynamic Programming', icon: '💡', color: '#f97316' },
  { id: 'greedy', label: 'Greedy', icon: '🏆', color: '#eab308' },
  { id: 'hash-tables', label: 'Hash Tables', icon: '#️⃣', color: '#64748b' },
];

export const PROBLEMS = [
  // ── ARRAYS ──
  { id:1, slug:'two-sum', title:'Two Sum', difficulty:'Easy', pattern:'arrays', leetcode:'https://leetcode.com/problems/two-sum/', topics:['Array','Hash Table'] },
  { id:2, slug:'best-time-to-buy-and-sell-stock', title:'Best Time to Buy and Sell Stock', difficulty:'Easy', pattern:'arrays', leetcode:'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', topics:['Array','DP'] },
  { id:3, slug:'contains-duplicate', title:'Contains Duplicate', difficulty:'Easy', pattern:'arrays', leetcode:'https://leetcode.com/problems/contains-duplicate/', topics:['Array','Hash Table'] },
  { id:4, slug:'product-of-array-except-self', title:'Product of Array Except Self', difficulty:'Medium', pattern:'arrays', leetcode:'https://leetcode.com/problems/product-of-array-except-self/', topics:['Array','Prefix Sum'] },
  { id:5, slug:'maximum-subarray', title:'Maximum Subarray', difficulty:'Medium', pattern:'arrays', leetcode:'https://leetcode.com/problems/maximum-subarray/', topics:['Array','DP'] },
  { id:6, slug:'maximum-product-subarray', title:'Maximum Product Subarray', difficulty:'Medium', pattern:'arrays', leetcode:'https://leetcode.com/problems/maximum-product-subarray/', topics:['Array','DP'] },
  { id:7, slug:'find-minimum-in-rotated-sorted-array', title:'Find Minimum in Rotated Sorted Array', difficulty:'Medium', pattern:'arrays', leetcode:'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', topics:['Array','Binary Search'] },
  { id:8, slug:'search-in-rotated-sorted-array', title:'Search in Rotated Sorted Array', difficulty:'Medium', pattern:'arrays', leetcode:'https://leetcode.com/problems/search-in-rotated-sorted-array/', topics:['Array','Binary Search'] },
  { id:9, slug:'3sum', title:'3Sum', difficulty:'Medium', pattern:'arrays', leetcode:'https://leetcode.com/problems/3sum/', topics:['Array','Two Pointers'] },
  { id:10, slug:'container-with-most-water', title:'Container With Most Water', difficulty:'Medium', pattern:'arrays', leetcode:'https://leetcode.com/problems/container-with-most-water/', topics:['Array','Two Pointers'] },

  // ── STRINGS ──
  { id:11, slug:'valid-anagram', title:'Valid Anagram', difficulty:'Easy', pattern:'strings', leetcode:'https://leetcode.com/problems/valid-anagram/', topics:['String','Hash Table'] },
  { id:12, slug:'valid-palindrome', title:'Valid Palindrome', difficulty:'Easy', pattern:'strings', leetcode:'https://leetcode.com/problems/valid-palindrome/', topics:['String','Two Pointers'] },
  { id:13, slug:'longest-substring-without-repeating-characters', title:'Longest Substring Without Repeating Characters', difficulty:'Medium', pattern:'strings', leetcode:'https://leetcode.com/problems/longest-substring-without-repeating-characters/', topics:['String','Sliding Window'] },
  { id:14, slug:'longest-repeating-character-replacement', title:'Longest Repeating Character Replacement', difficulty:'Medium', pattern:'strings', leetcode:'https://leetcode.com/problems/longest-repeating-character-replacement/', topics:['String','Sliding Window'] },
  { id:15, slug:'minimum-window-substring', title:'Minimum Window Substring', difficulty:'Hard', pattern:'strings', leetcode:'https://leetcode.com/problems/minimum-window-substring/', topics:['String','Sliding Window'] },
  { id:16, slug:'group-anagrams', title:'Group Anagrams', difficulty:'Medium', pattern:'strings', leetcode:'https://leetcode.com/problems/group-anagrams/', topics:['String','Hash Table'] },
  { id:17, slug:'encode-and-decode-strings', title:'Encode and Decode Strings', difficulty:'Medium', pattern:'strings', leetcode:'https://leetcode.com/problems/encode-and-decode-strings/', topics:['String','Design'] },
  { id:18, slug:'palindromic-substrings', title:'Palindromic Substrings', difficulty:'Medium', pattern:'strings', leetcode:'https://leetcode.com/problems/palindromic-substrings/', topics:['String','DP'] },

  // ── TWO POINTERS ──
  { id:19, slug:'merge-sorted-array', title:'Merge Sorted Array', difficulty:'Easy', pattern:'two-pointers', leetcode:'https://leetcode.com/problems/merge-sorted-array/', topics:['Array','Two Pointers'] },
  { id:20, slug:'two-sum-ii', title:'Two Sum II - Input Array Is Sorted', difficulty:'Medium', pattern:'two-pointers', leetcode:'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', topics:['Array','Two Pointers'] },
  { id:21, slug:'trapping-rain-water', title:'Trapping Rain Water', difficulty:'Hard', pattern:'two-pointers', leetcode:'https://leetcode.com/problems/trapping-rain-water/', topics:['Array','Two Pointers','Stack'] },
  { id:22, slug:'remove-nth-node-from-end-of-list', title:'Remove Nth Node From End of List', difficulty:'Medium', pattern:'two-pointers', leetcode:'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', topics:['Linked List','Two Pointers'] },
  { id:23, slug:'linked-list-cycle', title:'Linked List Cycle', difficulty:'Easy', pattern:'two-pointers', leetcode:'https://leetcode.com/problems/linked-list-cycle/', topics:['Linked List','Two Pointers'] },
  { id:24, slug:'sort-colors', title:'Sort Colors', difficulty:'Medium', pattern:'two-pointers', leetcode:'https://leetcode.com/problems/sort-colors/', topics:['Array','Two Pointers'] },
  { id:25, slug:'boats-to-save-people', title:'Boats to Save People', difficulty:'Medium', pattern:'two-pointers', leetcode:'https://leetcode.com/problems/boats-to-save-people/', topics:['Array','Two Pointers','Greedy'] },

  // ── SLIDING WINDOW ──
  { id:26, slug:'maximum-average-subarray-i', title:'Maximum Average Subarray I', difficulty:'Easy', pattern:'sliding-window', leetcode:'https://leetcode.com/problems/maximum-average-subarray-i/', topics:['Array','Sliding Window'] },
  { id:27, slug:'permutation-in-string', title:'Permutation in String', difficulty:'Medium', pattern:'sliding-window', leetcode:'https://leetcode.com/problems/permutation-in-string/', topics:['String','Sliding Window'] },
  { id:28, slug:'find-all-anagrams-in-a-string', title:'Find All Anagrams in a String', difficulty:'Medium', pattern:'sliding-window', leetcode:'https://leetcode.com/problems/find-all-anagrams-in-a-string/', topics:['String','Sliding Window'] },
  { id:29, slug:'max-consecutive-ones-iii', title:'Max Consecutive Ones III', difficulty:'Medium', pattern:'sliding-window', leetcode:'https://leetcode.com/problems/max-consecutive-ones-iii/', topics:['Array','Sliding Window','Binary Search'] },
  { id:30, slug:'subarray-sum-equals-k', title:'Subarray Sum Equals K', difficulty:'Medium', pattern:'sliding-window', leetcode:'https://leetcode.com/problems/subarray-sum-equals-k/', topics:['Array','Hash Table','Prefix Sum'] },
  { id:31, slug:'sliding-window-maximum', title:'Sliding Window Maximum', difficulty:'Hard', pattern:'sliding-window', leetcode:'https://leetcode.com/problems/sliding-window-maximum/', topics:['Array','Queue','Sliding Window','Deque'] },
  { id:32, slug:'minimum-size-subarray-sum', title:'Minimum Size Subarray Sum', difficulty:'Medium', pattern:'sliding-window', leetcode:'https://leetcode.com/problems/minimum-size-subarray-sum/', topics:['Array','Binary Search','Sliding Window'] },

  // ── BINARY SEARCH ──
  { id:33, slug:'binary-search', title:'Binary Search', difficulty:'Easy', pattern:'binary-search', leetcode:'https://leetcode.com/problems/binary-search/', topics:['Array','Binary Search'] },
  { id:34, slug:'search-a-2d-matrix', title:'Search a 2D Matrix', difficulty:'Medium', pattern:'binary-search', leetcode:'https://leetcode.com/problems/search-a-2d-matrix/', topics:['Array','Binary Search'] },
  { id:35, slug:'koko-eating-bananas', title:'Koko Eating Bananas', difficulty:'Medium', pattern:'binary-search', leetcode:'https://leetcode.com/problems/koko-eating-bananas/', topics:['Array','Binary Search'] },
  { id:36, slug:'time-based-key-value-store', title:'Time Based Key-Value Store', difficulty:'Medium', pattern:'binary-search', leetcode:'https://leetcode.com/problems/time-based-key-value-store/', topics:['Hash Table','Binary Search','Design'] },
  { id:37, slug:'median-of-two-sorted-arrays', title:'Median of Two Sorted Arrays', difficulty:'Hard', pattern:'binary-search', leetcode:'https://leetcode.com/problems/median-of-two-sorted-arrays/', topics:['Array','Binary Search','Divide and Conquer'] },
  { id:38, slug:'find-peak-element', title:'Find Peak Element', difficulty:'Medium', pattern:'binary-search', leetcode:'https://leetcode.com/problems/find-peak-element/', topics:['Array','Binary Search'] },
  { id:39, slug:'first-bad-version', title:'First Bad Version', difficulty:'Easy', pattern:'binary-search', leetcode:'https://leetcode.com/problems/first-bad-version/', topics:['Binary Search','Interactive'] },
  { id:40, slug:'capacity-to-ship-packages', title:'Capacity to Ship Packages Within D Days', difficulty:'Medium', pattern:'binary-search', leetcode:'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/', topics:['Array','Binary Search'] },

  // ── LINKED LIST ──
  { id:41, slug:'reverse-linked-list', title:'Reverse Linked List', difficulty:'Easy', pattern:'linked-list', leetcode:'https://leetcode.com/problems/reverse-linked-list/', topics:['Linked List','Recursion'] },
  { id:42, slug:'merge-two-sorted-lists', title:'Merge Two Sorted Lists', difficulty:'Easy', pattern:'linked-list', leetcode:'https://leetcode.com/problems/merge-two-sorted-lists/', topics:['Linked List','Recursion'] },
  { id:43, slug:'reorder-list', title:'Reorder List', difficulty:'Medium', pattern:'linked-list', leetcode:'https://leetcode.com/problems/reorder-list/', topics:['Linked List','Recursion','Stack'] },
  { id:44, slug:'merge-k-sorted-lists', title:'Merge K Sorted Lists', difficulty:'Hard', pattern:'linked-list', leetcode:'https://leetcode.com/problems/merge-k-sorted-lists/', topics:['Linked List','Divide and Conquer','Heap'] },
  { id:45, slug:'lru-cache', title:'LRU Cache', difficulty:'Medium', pattern:'linked-list', leetcode:'https://leetcode.com/problems/lru-cache/', topics:['Hash Table','Linked List','Design'] },
  { id:46, slug:'add-two-numbers', title:'Add Two Numbers', difficulty:'Medium', pattern:'linked-list', leetcode:'https://leetcode.com/problems/add-two-numbers/', topics:['Linked List','Math','Recursion'] },
  { id:47, slug:'copy-list-with-random-pointer', title:'Copy List with Random Pointer', difficulty:'Medium', pattern:'linked-list', leetcode:'https://leetcode.com/problems/copy-list-with-random-pointer/', topics:['Hash Table','Linked List'] },

  // ── STACK & QUEUE ──
  { id:48, slug:'valid-parentheses', title:'Valid Parentheses', difficulty:'Easy', pattern:'stack-queue', leetcode:'https://leetcode.com/problems/valid-parentheses/', topics:['String','Stack'] },
  { id:49, slug:'min-stack', title:'Min Stack', difficulty:'Medium', pattern:'stack-queue', leetcode:'https://leetcode.com/problems/min-stack/', topics:['Stack','Design'] },
  { id:50, slug:'daily-temperatures', title:'Daily Temperatures', difficulty:'Medium', pattern:'stack-queue', leetcode:'https://leetcode.com/problems/daily-temperatures/', topics:['Array','Stack','Monotonic Stack'] },
  { id:51, slug:'car-fleet', title:'Car Fleet', difficulty:'Medium', pattern:'stack-queue', leetcode:'https://leetcode.com/problems/car-fleet/', topics:['Array','Stack','Sorting','Monotonic Stack'] },
  { id:52, slug:'largest-rectangle-in-histogram', title:'Largest Rectangle in Histogram', difficulty:'Hard', pattern:'stack-queue', leetcode:'https://leetcode.com/problems/largest-rectangle-in-histogram/', topics:['Array','Stack','Monotonic Stack'] },
  { id:53, slug:'implement-queue-using-stacks', title:'Implement Queue Using Stacks', difficulty:'Easy', pattern:'stack-queue', leetcode:'https://leetcode.com/problems/implement-queue-using-stacks/', topics:['Stack','Queue','Design'] },
  { id:54, slug:'evaluate-reverse-polish-notation', title:'Evaluate Reverse Polish Notation', difficulty:'Medium', pattern:'stack-queue', leetcode:'https://leetcode.com/problems/evaluate-reverse-polish-notation/', topics:['Array','Math','Stack'] },
  { id:55, slug:'generate-parentheses', title:'Generate Parentheses', difficulty:'Medium', pattern:'stack-queue', leetcode:'https://leetcode.com/problems/generate-parentheses/', topics:['String','DP','Backtracking'] },

  // ── TREES ──
  { id:56, slug:'invert-binary-tree', title:'Invert Binary Tree', difficulty:'Easy', pattern:'trees', leetcode:'https://leetcode.com/problems/invert-binary-tree/', topics:['Tree','DFS','BFS','Binary Tree'] },
  { id:57, slug:'maximum-depth-of-binary-tree', title:'Maximum Depth of Binary Tree', difficulty:'Easy', pattern:'trees', leetcode:'https://leetcode.com/problems/maximum-depth-of-binary-tree/', topics:['Tree','DFS','BFS','Binary Tree'] },
  { id:58, slug:'same-tree', title:'Same Tree', difficulty:'Easy', pattern:'trees', leetcode:'https://leetcode.com/problems/same-tree/', topics:['Tree','DFS','BFS','Binary Tree'] },
  { id:59, slug:'subtree-of-another-tree', title:'Subtree of Another Tree', difficulty:'Easy', pattern:'trees', leetcode:'https://leetcode.com/problems/subtree-of-another-tree/', topics:['Tree','DFS','Binary Tree','String Matching'] },
  { id:60, slug:'lowest-common-ancestor-of-a-binary-search-tree', title:'Lowest Common Ancestor of a BST', difficulty:'Medium', pattern:'trees', leetcode:'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', topics:['Tree','DFS','Binary Search Tree'] },
  { id:61, slug:'binary-tree-level-order-traversal', title:'Binary Tree Level Order Traversal', difficulty:'Medium', pattern:'trees', leetcode:'https://leetcode.com/problems/binary-tree-level-order-traversal/', topics:['Tree','BFS','Binary Tree'] },
  { id:62, slug:'binary-tree-right-side-view', title:'Binary Tree Right Side View', difficulty:'Medium', pattern:'trees', leetcode:'https://leetcode.com/problems/binary-tree-right-side-view/', topics:['Tree','DFS','BFS','Binary Tree'] },
  { id:63, slug:'count-good-nodes-in-binary-tree', title:'Count Good Nodes in Binary Tree', difficulty:'Medium', pattern:'trees', leetcode:'https://leetcode.com/problems/count-good-nodes-in-binary-tree/', topics:['Tree','DFS','BFS','Binary Tree'] },
  { id:64, slug:'validate-binary-search-tree', title:'Validate Binary Search Tree', difficulty:'Medium', pattern:'trees', leetcode:'https://leetcode.com/problems/validate-binary-search-tree/', topics:['Tree','DFS','Binary Search Tree'] },
  { id:65, slug:'kth-smallest-element-in-a-bst', title:'Kth Smallest Element in a BST', difficulty:'Medium', pattern:'trees', leetcode:'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', topics:['Tree','DFS','Binary Search Tree'] },
  { id:66, slug:'binary-tree-maximum-path-sum', title:'Binary Tree Maximum Path Sum', difficulty:'Hard', pattern:'trees', leetcode:'https://leetcode.com/problems/binary-tree-maximum-path-sum/', topics:['Tree','DFS','DP','Binary Tree'] },

  // ── GRAPHS ──
  { id:67, slug:'number-of-islands', title:'Number of Islands', difficulty:'Medium', pattern:'graphs', leetcode:'https://leetcode.com/problems/number-of-islands/', topics:['Array','DFS','BFS','Union Find','Matrix'] },
  { id:68, slug:'clone-graph', title:'Clone Graph', difficulty:'Medium', pattern:'graphs', leetcode:'https://leetcode.com/problems/clone-graph/', topics:['Hash Table','DFS','BFS','Graph'] },
  { id:69, slug:'max-area-of-island', title:'Max Area of Island', difficulty:'Medium', pattern:'graphs', leetcode:'https://leetcode.com/problems/max-area-of-island/', topics:['Array','DFS','BFS','Union Find','Matrix'] },
  { id:70, slug:'pacific-atlantic-water-flow', title:'Pacific Atlantic Water Flow', difficulty:'Medium', pattern:'graphs', leetcode:'https://leetcode.com/problems/pacific-atlantic-water-flow/', topics:['Array','DFS','BFS','Matrix'] },
  { id:71, slug:'surrounded-regions', title:'Surrounded Regions', difficulty:'Medium', pattern:'graphs', leetcode:'https://leetcode.com/problems/surrounded-regions/', topics:['Array','DFS','BFS','Union Find','Matrix'] },
  { id:72, slug:'rotting-oranges', title:'Rotting Oranges', difficulty:'Medium', pattern:'graphs', leetcode:'https://leetcode.com/problems/rotting-oranges/', topics:['Array','BFS','Matrix'] },
  { id:73, slug:'course-schedule', title:'Course Schedule', difficulty:'Medium', pattern:'graphs', leetcode:'https://leetcode.com/problems/course-schedule/', topics:['DFS','BFS','Graph','Topological Sort'] },
  { id:74, slug:'course-schedule-ii', title:'Course Schedule II', difficulty:'Medium', pattern:'graphs', leetcode:'https://leetcode.com/problems/course-schedule-ii/', topics:['DFS','BFS','Graph','Topological Sort'] },
  { id:75, slug:'redundant-connection', title:'Redundant Connection', difficulty:'Medium', pattern:'graphs', leetcode:'https://leetcode.com/problems/redundant-connection/', topics:['DFS','BFS','Union Find','Graph'] },
  { id:76, slug:'word-ladder', title:'Word Ladder', difficulty:'Hard', pattern:'graphs', leetcode:'https://leetcode.com/problems/word-ladder/', topics:['Hash Table','String','BFS'] },

  // ── DYNAMIC PROGRAMMING ──
  { id:77, slug:'climbing-stairs', title:'Climbing Stairs', difficulty:'Easy', pattern:'dynamic-programming', leetcode:'https://leetcode.com/problems/climbing-stairs/', topics:['Math','DP','Memoization'] },
  { id:78, slug:'house-robber', title:'House Robber', difficulty:'Medium', pattern:'dynamic-programming', leetcode:'https://leetcode.com/problems/house-robber/', topics:['Array','DP'] },
  { id:79, slug:'house-robber-ii', title:'House Robber II', difficulty:'Medium', pattern:'dynamic-programming', leetcode:'https://leetcode.com/problems/house-robber-ii/', topics:['Array','DP'] },
  { id:80, slug:'longest-palindromic-substring', title:'Longest Palindromic Substring', difficulty:'Medium', pattern:'dynamic-programming', leetcode:'https://leetcode.com/problems/longest-palindromic-substring/', topics:['String','DP'] },
  { id:81, slug:'decode-ways', title:'Decode Ways', difficulty:'Medium', pattern:'dynamic-programming', leetcode:'https://leetcode.com/problems/decode-ways/', topics:['String','DP'] },
  { id:82, slug:'unique-paths', title:'Unique Paths', difficulty:'Medium', pattern:'dynamic-programming', leetcode:'https://leetcode.com/problems/unique-paths/', topics:['Math','DP','Combinatorics'] },
  { id:83, slug:'jump-game', title:'Jump Game', difficulty:'Medium', pattern:'dynamic-programming', leetcode:'https://leetcode.com/problems/jump-game/', topics:['Array','DP','Greedy'] },
  { id:84, slug:'word-break', title:'Word Break', difficulty:'Medium', pattern:'dynamic-programming', leetcode:'https://leetcode.com/problems/word-break/', topics:['Hash Table','String','DP','Trie','Memoization'] },
  { id:85, slug:'longest-common-subsequence', title:'Longest Common Subsequence', difficulty:'Medium', pattern:'dynamic-programming', leetcode:'https://leetcode.com/problems/longest-common-subsequence/', topics:['String','DP'] },
  { id:86, slug:'coin-change', title:'Coin Change', difficulty:'Medium', pattern:'dynamic-programming', leetcode:'https://leetcode.com/problems/coin-change/', topics:['Array','DP','BFS'] },
  { id:87, slug:'edit-distance', title:'Edit Distance', difficulty:'Medium', pattern:'dynamic-programming', leetcode:'https://leetcode.com/problems/edit-distance/', topics:['String','DP'] },

  // ── GREEDY ──
  { id:88, slug:'maximum-subarray-greedy', title:'Jump Game II', difficulty:'Medium', pattern:'greedy', leetcode:'https://leetcode.com/problems/jump-game-ii/', topics:['Array','DP','Greedy'] },
  { id:89, slug:'gas-station', title:'Gas Station', difficulty:'Medium', pattern:'greedy', leetcode:'https://leetcode.com/problems/gas-station/', topics:['Array','Greedy'] },
  { id:90, slug:'hand-of-straights', title:'Hand of Straights', difficulty:'Medium', pattern:'greedy', leetcode:'https://leetcode.com/problems/hand-of-straights/', topics:['Array','Hash Table','Greedy','Sorting'] },
  { id:91, slug:'merge-intervals', title:'Merge Intervals', difficulty:'Medium', pattern:'greedy', leetcode:'https://leetcode.com/problems/merge-intervals/', topics:['Array','Sorting'] },
  { id:92, slug:'non-overlapping-intervals', title:'Non-overlapping Intervals', difficulty:'Medium', pattern:'greedy', leetcode:'https://leetcode.com/problems/non-overlapping-intervals/', topics:['Array','DP','Greedy','Sorting'] },
  { id:93, slug:'partition-labels', title:'Partition Labels', difficulty:'Medium', pattern:'greedy', leetcode:'https://leetcode.com/problems/partition-labels/', topics:['Hash Table','Two Pointers','String','Greedy'] },

  // ── HASH TABLES ──
  { id:94, slug:'design-hashmap', title:'Design HashMap', difficulty:'Easy', pattern:'hash-tables', leetcode:'https://leetcode.com/problems/design-hashmap/', topics:['Array','Hash Table','Linked List','Design','Hash Function'] },
  { id:95, slug:'two-sum-hash', title:'Top K Frequent Elements', difficulty:'Medium', pattern:'hash-tables', leetcode:'https://leetcode.com/problems/top-k-frequent-elements/', topics:['Array','Hash Table','Divide and Conquer','Sorting','Heap','Bucket Sort'] },
  { id:96, slug:'longest-consecutive-sequence', title:'Longest Consecutive Sequence', difficulty:'Medium', pattern:'hash-tables', leetcode:'https://leetcode.com/problems/longest-consecutive-sequence/', topics:['Array','Hash Table','Union Find'] },
  { id:97, slug:'ransom-note', title:'Ransom Note', difficulty:'Easy', pattern:'hash-tables', leetcode:'https://leetcode.com/problems/ransom-note/', topics:['Hash Table','String','Counting'] },
  { id:98, slug:'isomorphic-strings', title:'Isomorphic Strings', difficulty:'Easy', pattern:'hash-tables', leetcode:'https://leetcode.com/problems/isomorphic-strings/', topics:['Hash Table','String'] },
  { id:99, slug:'4sum-ii', title:'4Sum II', difficulty:'Medium', pattern:'hash-tables', leetcode:'https://leetcode.com/problems/4sum-ii/', topics:['Array','Hash Table'] },
  { id:100, slug:'find-duplicate-number', title:'Find the Duplicate Number', difficulty:'Medium', pattern:'hash-tables', leetcode:'https://leetcode.com/problems/find-the-duplicate-number/', topics:['Array','Two Pointers','Binary Search','Bit Manipulation'] },
];

export function getProblemsByPattern(patternId) {
  return PROBLEMS.filter(p => p.pattern === patternId);
}

export function getProblemBySlug(slug) {
  return PROBLEMS.find(p => p.slug === slug);
}
