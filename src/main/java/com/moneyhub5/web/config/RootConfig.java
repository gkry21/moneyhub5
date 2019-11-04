package com.moneyhub5.web.config;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.DriverManagerDataSource;



@Configuration
@MapperScan(basePackages= {"com.moneyhub5.web"})
@ComponentScan(basePackages= {"com.moneyhub5.web"})


public class RootConfig {
	@Bean
	public DataSource dataSource() {
//	HikariConfig hikariConfig = new HikariConfig();
//	hikariConfig.setDriverClassName("com.mysql.jdbc.Driver");
//	hikariConfig.setJdbcUrl("jdbc:mysql://localhost:3306/moneyhub?serverTimezone=UTC");
//	hikariConfig.setUsername("moneyhub");
//	hikariConfig.setPassword("moneyhub");
//	
//	HikariDataSource dataSource = new HikariDataSource(hikariConfig);
//	
		DriverManagerDataSource dataSource = new DriverManagerDataSource();

	    dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
	    dataSource.setUrl("jdbc:mysql://localhost:3306/moneyhub?serverTimezone=UTC");
	    dataSource.setUsername("moneyhub");
	    dataSource.setPassword("moneyhub");
	return dataSource;

	}
	@Bean
	public DataSourceTransactionManager txManager() {
		return new DataSourceTransactionManager(dataSource());
	}
	
}
