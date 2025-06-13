
        document.addEventListener('DOMContentLoaded', function() {

            let currentOrderNumber = 1;

            const submitBtn = document.getElementById('submit-btn');

            const resetBtn = document.getElementById('reset-btn');

            const tableBody = document.getElementById('table-body');

            const rankInput = document.getElementById('rank');

            let savedData = [];

            let editIndex = null;

            // تعيين الرقم الترتيبي التلقائي عند تحميل الصفحة

            updateOrderNumber();

            function updateOrderNumber() {

                rankInput.value = currentOrderNumber;

            }

            function generateNextOrderNumber() {

                if (savedData.length > 0) {

                    const lastOrderNumber = Math.max(...savedData.map(item => parseInt(item.rank)));

                    currentOrderNumber = lastOrderNumber + 1;

                } else {

                    currentOrderNumber = 1;

                }

                updateOrderNumber();

            }

            submitBtn.addEventListener('click', function() {

                const storyId = document.getElementById('story-id').value;

                const rank = document.getElementById('rank').value;

                const name = document.getElementById('name').value;

                const date = document.getElementById('date').value;

                

                if (!storyId || !name || !date) {

                    alert('الرجاء ملء جميع الحقول المطلوبة');

                    return;

                }

                

                const newData = {

                    storyId: storyId,

                    rank: rank,

                    name: name,

                    date: new Date(date).toLocaleDateString('ar-EG')

                };

                

                if (editIndex !== null) {

                    // حالة التعديل

                    savedData[editIndex] = newData;

                    editIndex = null;

                } else {

                    // حالة الإضافة الجديدة

                    savedData.push(newData);

                    currentOrderNumber++;

                    updateOrderNumber();

                }

                

                updateTable();

                resetForm();

            });

            resetBtn.addEventListener('click', function() {

                resetForm();

                editIndex = null;

                generateNextOrderNumber();

            });

            function updateTable() {

                tableBody.innerHTML = '';

                

                savedData.forEach((data, index) => {

                    const row = document.createElement('tr');

                    

                    row.innerHTML = `

                        <td>${index + 1}</td>

                        <td>${data.storyId}</td>

                        <td>${data.rank}</td>

                        <td>${data.name}</td>

                        <td>${data.date}</td>

                        <td>

                            <button class="edit-btn" onclick="editRow(${index})">تعديل</button>

                            <button class="delete-btn" onclick="deleteRow(${index})">حذف</button>

                        </td>

                    `;

                    

                    tableBody.appendChild(row);

                });

            }

            function resetForm() {

                document.getElementById('story-id').value = '';

                document.getElementById('name').value = '';

                document.getElementById('date').value = '';

                generateNextOrderNumber();

            }

            // تعريف الدوال في النطاق العام لاستخدامها في الأحداث

            window.editRow = function(index) {

                const data = savedData[index];

                document.getElementById('story-id').value = data.storyId;

                document.getElementById('rank').value = data.rank;

                document.getElementById('name').value = data.name;

                document.getElementById('date').valueAsDate = new Date(data.date);

                

                editIndex = index;

                submitBtn.textContent = 'تحديث البيانات';

            };

            window.deleteRow = function(index) {

                if (confirm('هل أنت متأكد من حذف هذه البيانات؟')) {

                    savedData.splice(index, 1);

                    updateTable();

                    generateNextOrderNumber();

                    

                    if (editIndex === index) {

                        resetForm();

                        editIndex = null;

                        submitBtn.textContent = 'حفظ البيانات';

                    } else if (editIndex !== null && editIndex > index) {

                        editIndex--;

                    }

                }

            };

            // عند تحميل الصفحة، توليد الرقم الترتيبي التالي

            generateNextOrderNumber();

        });

 
