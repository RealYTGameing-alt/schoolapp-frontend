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

    // Title
    doc.setFontSize(18);
    doc.text("SCHOOL NAME", 105, 20, null, null, "center");

    doc.setFontSize(14);
    doc.text("FEE RECEIPT", 105, 30, null, null, "center");

    // Line
    doc.line(20, 35, 190, 35);

    // Receipt details
    doc.setFontSize(12);

    doc.text(`Receipt No: RCPT-${fee.id}`, 20, 50);
    doc.text(`Date: ${fee.paidOn}`, 150, 50);

    doc.text(`Student Name: Suresh Sharma`, 20, 65);
    doc.text(`Term: ${fee.term}`, 20, 75);

    doc.text(`Amount Paid: ${fee.amount}`, 20, 90);
    doc.text(`Payment Status: ${fee.status}`, 20, 100);

    // Box around details (just for structure)
    doc.rect(15, 40, 180, 70);

    // Footer
    doc.text("This is a system-generated receipt.", 20, 125);
    doc.text("Thank you for your payment.", 20, 135);

    // Signature placeholder
    doc.text("Authorized Signature", 140, 160);
    doc.line(140, 155, 190, 155);

    // Save PDF
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