import React from 'react';
import {
  Typography, Box, Card, CardContent, Chip, Button,
  Table, TableBody, TableCell, TableHead, TableRow
} from '@mui/material';
import Layout from '../../components/layout/Layout';
import { parentMenu } from '../../components/layout/menus';
import { jsPDF } from "jspdf";

const fees = [
  { id: 1, term: 'Term 1 (Apr-Jun)', amount: '₹12,000', dueDate: '2025-04-10', status: 'Paid', paidOn: '2025-04-08' },
  { id: 2, term: 'Term 2 (Jul-Sep)', amount: '₹12,000', dueDate: '2025-07-10', status: 'Paid', paidOn: '2025-07-09' },
  { id: 3, term: 'Term 3 (Oct-Dec)', amount: '₹12,000', dueDate: '2025-10-10', status: 'Paid', paidOn: '2025-10-07' },
  { id: 4, term: 'Term 4 (Jan-Mar)', amount: '₹12,000', dueDate: '2026-01-10', status: 'Paid', paidOn: '2026-01-09' },
  { id: 5, term: 'Activity Fee', amount: '₹2,500', dueDate: '2026-03-10', status: 'Pending', paidOn: '—' },
];

const ParentFees = () => {

const handleDownloadReceipt = (fee) => {
  const doc = new jsPDF();

  // ===== LOGO (fake circle logo) =====
  doc.setFillColor(26, 115, 232); // blue
  doc.circle(20, 20, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text("SCH", 20, 22, null, null, "center");

  // Reset text color
  doc.setTextColor(0, 0, 0);

  // ===== SCHOOL NAME =====
  doc.setFontSize(16);
  doc.text("Green Valley School", 105, 20, null, null, "center");

  doc.setFontSize(12);
  doc.text("Fee Receipt", 105, 28, null, null, "center");

  // Line
  doc.line(20, 32, 190, 32);

  // ===== RECEIPT INFO =====
  doc.setFontSize(11);

  doc.text(`Receipt No: RCPT-${fee.id}`, 20, 45);
  doc.text(`Date: ${fee.paidOn}`, 140, 45);

  // ===== STUDENT INFO =====
  doc.text(`Student Name: Suresh Sharma`, 20, 60);
  doc.text(`Term: ${fee.term}`, 20, 70);

  // ===== PAYMENT BOX =====
  doc.rect(20, 80, 170, 40);

  doc.setFontSize(12);
  doc.text("Payment Details", 25, 90);

  doc.setFontSize(11);

  // 🔥 FIXED AMOUNT (no ₹ glitch)
  const cleanAmount = fee.amount.replace('₹', 'Rs.');

  doc.text(`Amount Paid: ${cleanAmount}`, 25, 105);
  doc.text(`Status: ${fee.status}`, 25, 115);

  // ===== FOOTER =====
  doc.setFontSize(10);
  doc.text("This is a system-generated receipt.", 20, 140);
  doc.text("Thank you for your payment.", 20, 148);

  // ===== PRINCIPAL SIGNATURE =====
  doc.text("Principal Signature", 140, 170);
  doc.line(140, 165, 190, 165);

  // Save
  doc.save(`${fee.term.replace(/\s/g, "_")}_Receipt.pdf`);
};

  return (
    <Layout menuItems={parentMenu}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        💰 Fee Payments
      </Typography>

      {/* Summary Cards */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        <Card sx={{ borderRadius: 3, flex: 1, minWidth: 150, borderLeft: '4px solid #34a853' }}>
          <CardContent>
            <Typography variant="h5" fontWeight={700} color="#34a853">
              ₹48,000
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Total Paid
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3, flex: 1, minWidth: 150, borderLeft: '4px solid #fbbc04' }}>
          <CardContent>
            <Typography variant="h5" fontWeight={700} color="#fbbc04">
              ₹2,500
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Pending
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Table */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 0 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                <TableCell>Term</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Paid On</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {fees.map((f) => (
                <TableRow key={f.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{f.term}</TableCell>
                  <TableCell>{f.amount}</TableCell>
                  <TableCell>{f.dueDate}</TableCell>

                  <TableCell>
                    <Chip
                      label={f.status}
                      size="small"
                      color={f.status === 'Paid' ? 'success' : 'warning'}
                    />
                  </TableCell>

                  <TableCell>{f.paidOn}</TableCell>

                  <TableCell>
                    {f.status === 'Paid' ? (
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{ borderRadius: 2 }}
                        onClick={() => handleDownloadReceipt(f)}
                      >
                        Receipt
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        variant="contained"
                        sx={{ borderRadius: 2 }}
                      >
                        Pay Now
                      </Button>
                    )}
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </Layout>
  );
};

export default ParentFees;