package com.example.finance.service;

import com.example.finance.model.Transaction;
import com.example.finance.model.TransactionType;
import com.example.finance.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository repository;

    public List<Transaction> getAllTransactions() {
        return repository.findAll();
    }

    public Transaction addTransaction(Transaction transaction) {
        return repository.save(transaction);
    }

    public void deleteTransaction(Long id) {
        repository.deleteById(id);
    }

    public Map<String, BigDecimal> getSummary() {
        List<Transaction> all = repository.findAll();
        BigDecimal income = all.stream()
                .filter(t -> t.getType() == TransactionType.INCOME)
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        BigDecimal expense = all.stream()
                .filter(t -> t.getType() == TransactionType.EXPENSE)
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        BigDecimal balance = income.subtract(expense);
        
        return Map.of("income", income, "expense", expense, "balance", balance);
    }

    public String exportToCsv() {
        List<Transaction> transactions = repository.findAll();
        StringBuilder csv = new StringBuilder();
        csv.append("Date,Description,Category,Type,Amount\n");

        for (Transaction t : transactions) {
            csv.append(t.getDate()).append(",")
               .append(escapeSpecialCharacters(t.getDescription())).append(",")
               .append(t.getCategory()).append(",")
               .append(t.getType()).append(",")
               .append(t.getAmount()).append("\n");
        }
        return csv.toString();
    }

    private String escapeSpecialCharacters(String data) {
        if (data == null) return "";
        String escapedData = data.replaceAll("\\R", " ");
        if (data.contains(",") || data.contains("\"") || data.contains("'")) {
            data = data.replace("\"", "\"\"");
            escapedData = "\"" + data + "\"";
        }
        return escapedData;
    }
}
