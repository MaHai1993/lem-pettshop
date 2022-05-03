package com.haimh.lempetshop.utils;

import java.text.NumberFormat;
import java.util.Locale;

public class Utils {

    public static String formatCurrency(Double value) {
        return NumberFormat.getCurrencyInstance(new Locale("en", "US")).format(value);
    }
}
