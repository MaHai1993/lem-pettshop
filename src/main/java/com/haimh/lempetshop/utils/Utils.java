package com.haimh.lempetshop.utils;

import com.haimh.lempetshop.domain.BaseEntity;
import com.haimh.lempetshop.security.SecurityUtils;
import java.text.NumberFormat;
import java.util.Date;
import java.util.Locale;

public class Utils {

    public static String formatCurrency(Double value) {
        return NumberFormat.getCurrencyInstance(new Locale("en", "US")).format(value);
    }

    /**
     * Set default param for all entities
     *
     * @param object
     * @param <O>
     * @return O
     */
    public static <O extends BaseEntity> Object setBaseEntityValue(O object) {
        String username = SecurityUtils.getCurrentUserLogin().get();
        object.setCreatedBy(username);
        object.setCreatedDate(new Date());
        object.setLastModifiedDate(new Date());
        object.setLastModifiedBy(username);
        object.setDelete(false);
        return object;
    }

    /**
     * Update default param for all entities
     *
     * @param object
     * @param <O>
     * @return O
     */
    public static <O extends BaseEntity> Object updateBaseEntity(O object) {
        String username = SecurityUtils.getCurrentUserLogin().get();
        object.setLastModifiedDate(new Date());
        object.setLastModifiedBy(username);
        return object;
    }
}
