package com.proquip.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "manufacturer")
public class Manufacturer extends AuditableEntity {

    @Column(name = "name", nullable = false, length = 200)
    private String name;

    @Column(name = "manufacturer_code", unique = true, nullable = false, length = 50)
    private String code;

    @Column(name = "country", length = 100)
    private String country;

    @Column(name = "website", length = 500)
    private String website;

    @Column(name = "contact_email", length = 200)
    private String contactEmail;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }
    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }
    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }
}
