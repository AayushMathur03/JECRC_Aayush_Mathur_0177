import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToPDF = (bill) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', 105, 20, { align: 'center' });

  // Invoice Details
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Invoice Number: ${bill.invoiceNumber}`, 20, 40);
  doc.text(`Date: ${new Date(bill.billDate).toLocaleString()}`, 20, 46);
  doc.text(`Status: ${bill.isDraft ? 'DRAFT' : 'FINALIZED'}`, 20, 52);

  if (bill.notes) {
    doc.text(`Notes: ${bill.notes}`, 20, 58);
  }

  // Items Table
  const tableData = bill.billItems.map(item => [
    item.itemName,
    item.description || '-',
    item.quantity,
    `Rs.${item.unitPrice.toFixed(2)}`,
    `Rs.${item.totalPrice.toFixed(2)}`,
  ]);

  autoTable(doc, {
    startY: 70,
    head: [['Item Name', 'Description', 'Qty', 'Unit Price', 'Total']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
    styles: { fontSize: 9 },
  });

  // Calculations
  const finalY = doc.lastAutoTable.finalY + 10;
  
  doc.setFont('helvetica', 'bold');
  doc.text(`Subtotal:`, 130, finalY);
  doc.text(`Rs.${bill.subTotal.toFixed(2)}`, 170, finalY, { align: 'right' });

  if (bill.discountAmount > 0 || bill.discountPercentage > 0) {
    doc.text(`Discount (${bill.discountPercentage}%):`, 130, finalY + 6);
    doc.text(`-Rs.${bill.discountAmount.toFixed(2)}`, 170, finalY + 6, { align: 'right' });
  }

  doc.text(`Tax (${bill.taxPercentage}%):`, 130, finalY + 12);
  doc.text(`Rs.${bill.taxAmount.toFixed(2)}`, 170, finalY + 12, { align: 'right' });

  doc.setFontSize(12);
  doc.text(`TOTAL:`, 130, finalY + 20);
  doc.text(`Rs.${bill.totalAmount.toFixed(2)}`, 170, finalY + 20, { align: 'right' });

  // Footer
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text('Thank you for your business!', 105, finalY + 35, { align: 'center' });

  // Save PDF
  doc.save(`Invoice-${bill.invoiceNumber}.pdf`);
};

export const exportToCSV = (bills) => {
  const headers = [
    'Invoice Number',
    'Date',
    'Subtotal',
    'Discount',
    'Tax',
    'Total',
    'Status',
    'Notes',
  ];

  const rows = bills.map(bill => [
    bill.invoiceNumber,
    new Date(bill.billDate).toLocaleString(),
    bill.subTotal.toFixed(2),
    bill.discountAmount.toFixed(2),
    bill.taxAmount.toFixed(2),
    bill.totalAmount.toFixed(2),
    bill.isDraft ? 'Draft' : 'Finalized',
    bill.notes || '',
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `bills-export-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const formatCurrency = (amount) => {
  return `₹${parseFloat(amount).toFixed(2)}`;
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
