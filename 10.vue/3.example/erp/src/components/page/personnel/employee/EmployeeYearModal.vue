<script setup>
    import { defineProps, defineEmits } from 'vue';
    
    const props = defineProps({
      show: Boolean,
    });
    
    const emit = defineEmits(['close']);
    
    const close = () => {
      emit('close');
    };
    
    const salaryData = [
      { rank: '대리', year1: 30000000, year2: 35000000, year3: 40000000, year4: 45000000, year5: 50000000 },
      { rank: '과장', year1: 35000000, year2: 40000000, year3: 45000000, year4: 50000000, year5: 55000000 },
      { rank: '부장', year1: 55000000, year2: 70000000, year3: 85000000, year4: 100000000, year5: 120000000 },
      { rank: '사원', year1: 30000000, year2: 35000000, year3: 40000000, year4: 45000000, year5: 50000000 },
    ];
</script>

<template>
    <div v-if="show" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h2>호봉</h2>
          <button class="close-btn" @click="close">×</button>
        </div>
        <div class="modal-body">
          <table class="salary-table">
            <thead>
              <tr>
                <th>직급명</th>
                <th>1년차</th>
                <th>2년차</th>
                <th>3년차</th>
                <th>4년차</th>
                <th>5년차</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in salaryData" :key="index">
                <td>{{ row.rank }}</td>
                <td>{{ row.year1.toLocaleString() }}</td>
                <td>{{ row.year2.toLocaleString() }}</td>
                <td>{{ row.year3.toLocaleString() }}</td>
                <td>{{ row.year4.toLocaleString() }}</td>
                <td>{{ row.year5.toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>

  <style scoped>
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999;
    }
    
    .modal-content {
      background: white;
      border-radius: 8px;
      width: 600px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
      overflow: hidden;
      font-family: '맑은 고딕', sans-serif;
    }
    
    .modal-header {
      background-color: #3e4566;
      color: white;
      padding: 10px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .modal-header h2 {
      font-size: 16px;
      margin: 0;
    }
    
    .close-btn {
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
    }
    
    .modal-body {
      padding: 20px;
    }
    
    .salary-table {
      width: 100%;
      border-collapse: collapse;
      text-align: center;
    }
    
    .salary-table th,
    .salary-table td {
      border: 1px solid #ccc;
      padding: 8px;
    }
    
    .salary-table thead {
      background-color: #f0f0f0;
      font-weight: bold;
    }
    </style>
